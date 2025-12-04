#!/bin/bash
# Convert PDF slides to WebP images
# Validates front matter dimensions match PDF page size at 200 DPI
# Requires: poppler (pdftoppm, pdfinfo) and libwebp (cwebp)
# macOS: brew install poppler webp

set -e

SOURCE_DIR="assets/slides-sources"
CONTENT_DIR="content/slides"
OUTPUT_BASE="assets/generated/slides"
DPI=200            # Fixed DPI for crisp text on retina
WEBP_QUALITY=85    # Optimal for text/graphics

# Extract value from YAML front matter
extract_frontmatter() {
    local key="$1"
    local file="$2"
    if [[ "$key" == *"."* ]]; then
        local parent="${key%%.*}"
        local child="${key#*.}"
        sed -n "/^${parent}:/,/^[a-z]/p" "$file" | grep -E "^\s+${child}:" | head -1 | sed 's/.*:\s*//' | tr -d ' '
    else
        grep -E "^${key}:" "$file" | head -1 | sed 's/.*:\s*//' | tr -d ' '
    fi
}

# Get PDF page dimensions and calculate expected pixels at DPI
# Returns: "width_px height_px width_in height_in"
get_pdf_dimensions() {
    local pdf="$1"
    local size=$(pdfinfo "$pdf" 2>/dev/null | grep "Page size:" | sed 's/Page size:\s*//')
    local width_pts=$(echo "$size" | awk '{print $1}')
    local height_pts=$(echo "$size" | awk '{print $3}')
    # Convert points to inches (72 pts = 1 inch)
    local width_in=$(echo "scale=4; $width_pts / 72" | bc)
    local height_in=$(echo "scale=4; $height_pts / 72" | bc)
    # Calculate pixels at DPI
    local width_px=$(echo "scale=0; $width_in * $DPI / 1" | bc)
    local height_px=$(echo "scale=0; $height_in * $DPI / 1" | bc)
    echo "$width_px $height_px $width_in $height_in"
}

# Process a single PDF
convert_pdf() {
    local pdf_path="$1"
    local pdf_name=$(basename "$pdf_path" .pdf)
    local slug=$(echo "$pdf_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

    local content_path="$CONTENT_DIR/$slug"
    local index_file="$content_path/_index.md"
    local output_dir="$OUTPUT_BASE/$slug"

    echo "Processing: $pdf_name"
    echo "  PDF: $pdf_path"
    echo "  Content: $content_path/"

    # Check content directory exists
    if [ ! -d "$content_path" ]; then
        echo ""
        echo "ERROR: Content directory not found: $content_path/"
        echo "       Create it with _index.md before running this script."
        exit 1
    fi

    # Check _index.md exists
    if [ ! -f "$index_file" ]; then
        echo ""
        echo "ERROR: Index file not found: $index_file"
        echo "       Create _index.md with reveal_hugo width/height settings."
        exit 1
    fi

    # Get PDF dimensions
    local dims=$(get_pdf_dimensions "$pdf_path")
    local expected_width=$(echo "$dims" | awk '{print $1}')
    local expected_height=$(echo "$dims" | awk '{print $2}')
    local pdf_width_in=$(echo "$dims" | awk '{print $3}')
    local pdf_height_in=$(echo "$dims" | awk '{print $4}')

    echo "  PDF page: ${pdf_width_in}\" × ${pdf_height_in}\" at ${DPI} DPI → ${expected_width} × ${expected_height} px"

    # Read width and height from front matter
    local fm_width=$(extract_frontmatter "reveal_hugo.width" "$index_file")
    local fm_height=$(extract_frontmatter "reveal_hugo.height" "$index_file")

    if [ -z "$fm_width" ] || [ -z "$fm_height" ]; then
        echo ""
        echo "ERROR: Missing reveal_hugo dimensions in $index_file"
        echo "       Add to front matter:"
        echo ""
        echo "       reveal_hugo:"
        echo "         width: $expected_width"
        echo "         height: $expected_height"
        exit 1
    fi

    echo "  Front matter: width=$fm_width, height=$fm_height"

    # Validate dimensions match
    if [ "$fm_width" != "$expected_width" ] || [ "$fm_height" != "$expected_height" ]; then
        echo ""
        echo "ERROR: Front matter dimensions don't match PDF at ${DPI} DPI"
        echo ""
        echo "       Expected:  width: $expected_width"
        echo "                  height: $expected_height"
        echo ""
        echo "       Found:     width: $fm_width"
        echo "                  height: $fm_height"
        echo ""
        echo "       Update $index_file to fix."
        exit 1
    fi

    echo "  ✓ Dimensions match"

    # Create output directory
    mkdir -p "$output_dir"

    # Create temp directory for intermediate PNGs
    local tmp_dir=$(mktemp -d)
    trap "rm -rf $tmp_dir" EXIT

    # PDF → PNG
    echo "  Converting PDF → PNG..."
    pdftoppm -png -r "$DPI" "$pdf_path" "$tmp_dir/page"

    # PNG → WebP
    echo "  Converting PNG → WebP (quality=$WEBP_QUALITY)..."
    for png in "$tmp_dir"/page-*.png; do
        if [ -f "$png" ]; then
            local page_num=$(basename "$png" .png | sed 's/page-//')
            local page_num_padded=$(printf "%02d" "$((10#$page_num))")
            local webp_path="$output_dir/page-${page_num_padded}.webp"
            cwebp -q "$WEBP_QUALITY" "$png" -o "$webp_path" 2>/dev/null
            echo "    page-${page_num_padded}.webp"
        fi
    done

    # Summary
    local count=$(ls -1 "$output_dir"/*.webp 2>/dev/null | wc -l | tr -d ' ')
    echo "  ✓ Generated $count slides"
    echo ""
}

# Main
echo "=== PDF to Slides Converter (${DPI} DPI) ==="
echo ""

# Check source directory
if [ ! -d "$SOURCE_DIR" ]; then
    echo "ERROR: Source directory not found: $SOURCE_DIR/"
    exit 1
fi

# Check dependencies
for cmd in pdftoppm pdfinfo cwebp bc; do
    if ! command -v $cmd &> /dev/null; then
        echo "ERROR: $cmd not found. Install with: brew install poppler webp"
        exit 1
    fi
done

# Process specific PDF or all PDFs
if [ -n "$1" ]; then
    if [ -f "$1" ]; then
        convert_pdf "$1"
    elif [ -f "$SOURCE_DIR/$1" ]; then
        convert_pdf "$SOURCE_DIR/$1"
    elif [ -f "$SOURCE_DIR/$1.pdf" ]; then
        convert_pdf "$SOURCE_DIR/$1.pdf"
    else
        echo "ERROR: PDF not found: $1"
        exit 1
    fi
else
    found=0
    for pdf in "$SOURCE_DIR"/*.pdf; do
        if [ -f "$pdf" ]; then
            convert_pdf "$pdf"
            found=1
        fi
    done

    if [ $found -eq 0 ]; then
        echo "No PDF files found in $SOURCE_DIR/"
        exit 1
    fi
fi

echo "Done!"