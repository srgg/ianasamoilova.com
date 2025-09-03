import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Shared field definitions for reuse across collections
const hugoBloxSectionFields = [
  {
    type: "string" as const,
    name: "block",
    label: "Block Type",
    options: [
      "collection",
      "cta-button-list", 
      "cta-card",
      "cta-image-paragraph",
      "features",
      "hero",
      "markdown",
      "resume-awards",
      "resume-biography",
      "resume-biography-3",
      "resume-experience",
      "resume-languages",
      "resume-skills",
      "stats",
      "testimonials"
    ],
  },
  {
    type: "string" as const,
    name: "id",
    label: "Section ID",
  },
  {
    type: "object" as const,
    name: "content",
    label: "Content",
    fields: [
      { type: "string" as const, name: "title", label: "Title" },
      { type: "rich-text" as const, name: "text", label: "Text" },
      { type: "string" as const, name: "subtitle", label: "Subtitle" },
      { type: "string" as const, name: "username", label: "Username (for biography)" },
      {
        type: "object" as const,
        name: "button",
        label: "Button",
        fields: [
          { type: "string" as const, name: "text", label: "Button Text" },
          { type: "string" as const, name: "url", label: "Button URL" }
        ]
      },
      {
        type: "object" as const,
        name: "buttons",
        label: "Buttons (for CTA blocks)",
        list: true,
        fields: [
          { type: "string" as const, name: "text", label: "Button Text" },
          { type: "string" as const, name: "url", label: "Button URL" },
          { type: "string" as const, name: "style", label: "Button Style", options: ["primary", "secondary", "outline"] }
        ]
      },
      {
        type: "object" as const,
        name: "features",
        label: "Features List",
        list: true,
        fields: [
          { type: "string" as const, name: "title", label: "Feature Title" },
          { type: "string" as const, name: "description", label: "Feature Description" },
          { type: "string" as const, name: "icon", label: "Feature Icon" }
        ]
      },
      {
        type: "object" as const,
        name: "stats",
        label: "Statistics",
        list: true,
        fields: [
          { type: "string" as const, name: "value", label: "Stat Value" },
          { type: "string" as const, name: "label", label: "Stat Label" },
          { type: "string" as const, name: "description", label: "Stat Description" }
        ]
      },
      {
        type: "object" as const,
        name: "testimonials",
        label: "Testimonials",
        list: true,
        fields: [
          { type: "rich-text" as const, name: "text", label: "Testimonial Text" },
          { type: "string" as const, name: "author", label: "Author Name" },
          { type: "string" as const, name: "role", label: "Author Role" },
          { type: "string" as const, name: "company", label: "Author Company" },
          { type: "string" as const, name: "avatar", label: "Author Avatar" }
        ]
      },
      {
        type: "object" as const,
        name: "filters",
        label: "Content Filters",
        fields: [
          { type: "string" as const, name: "folders", label: "Folders", list: true },
          { type: "string" as const, name: "subdirs", label: "Subdirectories" },
          { type: "string" as const, name: "page_type", label: "Page Type" },
          { type: "boolean" as const, name: "featured_only", label: "Featured Only" },
          { type: "boolean" as const, name: "exclude_featured", label: "Exclude Featured" }
        ]
      }
    ]
  },
  {
    type: "object" as const,
    name: "design",
    label: "Design Settings",
    fields: [
      { type: "string" as const, name: "view", label: "View Type", options: ["article-grid", "citation", "date-title-summary"] },
      { type: "number" as const, name: "columns", label: "Columns" },
      { type: "string" as const, name: "css_class", label: "CSS Class" },
      { type: "boolean" as const, name: "fill_image", label: "Fill Image" },
      {
        type: "object" as const,
        name: "avatar",
        label: "Avatar Settings",
        fields: [
          { type: "string" as const, name: "size", label: "Size", options: ["small", "medium", "large", "xl", "xxl"] },
          { type: "string" as const, name: "shape", label: "Shape", options: ["circle", "square", "rounded"] }
        ]
      },
      {
        type: "object" as const,
        name: "background",
        label: "Background",
        fields: [
          { type: "string" as const, name: "color", label: "Background Color" },
          {
            type: "object" as const,
            name: "image",
            label: "Background Image",
            fields: [
              { type: "string" as const, name: "filename", label: "Image Filename" },
              { type: "string" as const, name: "size", label: "Size", options: ["cover", "contain", "auto"] },
              { type: "string" as const, name: "position", label: "Position", options: ["center", "top", "bottom", "left", "right"] },
              { type: "boolean" as const, name: "parallax", label: "Parallax Effect" },
              {
                type: "object" as const,
                name: "filters",
                label: "Image Filters",
                fields: [{ type: "number" as const, name: "brightness", label: "Brightness" }]
              }
            ]
          }
        ]
      }
    ]
  }
];

const commonPageFields = [
  { type: "string" as const, name: "title", label: "Title" },
  { type: "string" as const, name: "summary", label: "Summary" },
  { type: "datetime" as const, name: "date", label: "Date" },
  { type: "string" as const, name: "type", label: "Type", options: ["landing", "project"] },
  { type: "string" as const, name: "tags", label: "Tags", list: true },
  {
    type: "object" as const,
    name: "design",
    label: "Page Design Settings",
    fields: [{ type: "string" as const, name: "spacing", label: "Section Spacing" }]
  },
  {
    type: "object" as const,
    name: "cascade",
    label: "Cascade",
    fields: [{ type: "string" as const, name: "type", label: "Child Type" }]
  },
  {
    type: "object" as const,
    name: "sections",
    label: "Page Sections",
    list: true,
    fields: hugoBloxSectionFields
  },
  { type: "rich-text" as const, name: "body", label: "Body", isBody: true }
];

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to set up new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "content",
        match: {
          include: "_index"
        },
        fields: commonPageFields
      },
      {
        name: "project_pages", 
        label: "Project Pages",
        path: "content/projects",
        match: {
          include: "**/_index",
          exclude: "authors/**"
        },
        fields: commonPageFields
      },
      {
        name: "project_assignment",
        label: "Project Assignments",
        path: "content/projects",
        match: {
          include: "**/assignments-*/**/index"
        },
        fields: [
          { type: "string" as const, name: "title", label: "Title", isTitle: true, required: true },
          { type: "string" as const, name: "summary", label: "Summary" },
          { type: "datetime" as const, name: "date", label: "Due Date" },
          { type: "boolean" as const, name: "draft", label: "Draft" },
          { type: "string" as const, name: "type", label: "Type", options: ["assignment"] },
          { type: "rich-text" as const, name: "body", label: "Body", isBody: true }
        ],
      },
      {
        name: "author",
        label: "Author Profile",
        path: "content/authors",
        match: {
          include: "**/_index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Display Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "name_pronunciation",
            label: "Name Pronunciation",
          },
          {
            type: "string",
            name: "first_name",
            label: "First Name",
          },
          {
            type: "string",
            name: "last_name",
            label: "Last Name",
          },
          {
            type: "string",
            name: "pronouns",
            label: "Pronouns",
          },
          {
            type: "object",
            name: "status",
            label: "Status",
            fields: [
              {
                type: "string",
                name: "icon",
                label: "Status Icon",
              }
            ]
          },
          {
            type: "boolean",
            name: "superuser",
            label: "Primary User",
          },
          {
            type: "boolean",
            name: "highlight_name",
            label: "Highlight Name in Lists",
          },
          {
            type: "string",
            name: "role",
            label: "Role/Position",
          },
          {
            type: "object",
            name: "organizations",
            label: "Organizations",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Organization Name",
              },
              {
                type: "string",
                name: "url",
                label: "Organization URL",
              }
            ]
          },
          {
            type: "object",
            name: "profiles",
            label: "Social Profiles",
            list: true,
            fields: [
              {
                type: "string",
                name: "icon",
                label: "Icon",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
              {
                type: "string",
                name: "label",
                label: "Label",
              }
            ]
          },
          {
            type: "string",
            name: "interests",
            label: "Interests",
            list: true,
          },
          {
            type: "object",
            name: "education",
            label: "Education",
            list: true,
            fields: [
              {
                type: "string",
                name: "area",
                label: "Area of Study",
              },
              {
                type: "string",
                name: "institution",
                label: "Institution",
              },
              {
                type: "datetime",
                name: "date_start",
                label: "Start Date",
              },
              {
                type: "datetime",
                name: "date_end",
                label: "End Date",
              },
              {
                type: "rich-text",
                name: "summary",
                label: "Summary",
              },
              {
                type: "object",
                name: "button",
                label: "Button",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text",
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "Button URL",
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "work",
            label: "Work Experience",
            list: true,
            fields: [
              {
                type: "string",
                name: "position",
                label: "Position",
              },
              {
                type: "string",
                name: "company_name",
                label: "Company Name",
              },
              {
                type: "string",
                name: "company_url",
                label: "Company URL",
              },
              {
                type: "datetime",
                name: "date_start",
                label: "Start Date",
              },
              {
                type: "datetime",
                name: "date_end",
                label: "End Date",
              },
              {
                type: "rich-text",
                name: "summary",
                label: "Summary",
              }
            ]
          },
          {
            type: "object",
            name: "languages",
            label: "Languages",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Language",
              },
              {
                type: "number",
                name: "percent",
                label: "Proficiency %",
              }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "About Me",
            isBody: true,
          },
        ],
      },
    ],
  },
});
