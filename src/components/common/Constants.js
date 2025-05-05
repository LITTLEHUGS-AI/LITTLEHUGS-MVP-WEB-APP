import { toast } from "react-toastify";

export function getError(error, touched, fieldName) {
  return error[fieldName] && touched[fieldName];
}

export const toastMessage = ({ content, option }) => {
  toast(
    content,
    {
      position: "top-center",
      autoClose: 2500,
      closeOnClick: true,
      hideProgressBar: true,
      closeButton: false,
      theme: "dark",
      ...option,
    },
    {
      className: "toast-message",
    }
  );
};

export const toastErrorMessage = ({ content, option }) => {
  toast(
    content,
    {
      position: "top-center",
      autoClose: 2500,
      closeOnClick: true,
      hideProgressBar: true,
      closeButton: false,
      theme: "dark",
      ...option,
    },
    {
      className: "toast-message",
    }
  );
};

export const getFileIcon = (filename) => {
  const ext = filename?.toLowerCase().split(".").pop();
  switch (ext) {
    case "pdf":
      return "/icons/myfiles/pdfv1.svg";
    case "doc":
    case "docx":
      return "/icons/myfiles/wordv1.svg";
    case "ppt":
    case "pptx":
      return "/icons/myfiles/pptv1.svg";
    case "xls":
    case "xlsx":
      return "/icons/myfiles/excelv1.svg";
    case "txt":
      return "/icons/myfiles/txtv1.svg";
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
      return "/icons/myfiles/imagev1.svg";
    default:
      return "/icons/myfiles/file.svg";
  }
};

const replaceBoldText = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

export const parseAndExtractResponse = (text) => {
  try {
    const cleanedText = text.replace(/\\\\\\\\n|\\\\n|\n|\t\t|\t/g, "");
    const jsonContent = JSON.parse(cleanedText);

    if (jsonContent.response) {
      return jsonContent.response;
    }
  } catch (error) {
    if (text.includes("#") || text.includes("**")) {
      const sections = text.split(/\n\s*\n/);

      let formattedContent = "";

      sections.forEach((section, index) => {
        section = section.trim();
        if (!section) {
          return;
        } else if (section.startsWith("###")) {
          formattedContent += `<h3>${section.replace(/###\s*/, "")}</h3>`;
        } else if (section.startsWith("##")) {
          formattedContent += `<h2>${section.replace("##", "")}</h2>`;
        } else if (section.startsWith("#")) {
          formattedContent += `<h1>${section.replace("#", "")}</h1>`;
        } else if (section.startsWith("- ")) {
          formattedContent += "<ul>";
          section.split("\n").forEach((item, idx) => {
            if (item.startsWith("- ")) {
              const listItem = replaceBoldText(item.replace("- ", ""));
              formattedContent += `<li>${listItem}</li>`;
            }
          });
          formattedContent += "</ul>";
        } else {
          formattedContent += `<p>${replaceBoldText(section)}</p>`;
        }
      });

      return formattedContent;
    } else {
      return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Replace bold text
        .replace(/\n\n/g, "</p><p>") // Replace double newlines with paragraph tags
        .replace(/\n/g, "<br/>"); // Replace single newlines with line break tags
    }
  }
};

const getAttachAllRolesDatabase = (attachFiles) => {
  return attachFiles
    ?.map((attachChat) => attachChat.Database.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(", ");
};

export const indexFileMap = {
  Organization: "support_docs",
  Finance: "finance",
  Engineering: "engineering",
  Enterprise: "enterprise",
  "Product Management": "products",
  Operations: "operations",
  "Information Technology": "IT",
  "Human Resources": "HR",
  Sales: "sales",
  Marketing: "marketing",
  Legal: "legal",
  Personal: "personal",
  "Research and Development (R&D)": "rnd",
  "Customer Service": "customer",
};

export const getIndexFile = (
  indexDataTag,
  payloadDropdown,
  personalLists,
  attachFiles
) => {
  if (indexDataTag === "All Roles" && attachFiles.length > 0) {
    return getAttachAllRolesDatabase(attachFiles);
  }
  if (indexDataTag in indexFileMap) {
    return indexFileMap[indexDataTag];
  }

  if (payloadDropdown.function) {
    const functionMapping = {
      Legal: "legal",
      "Research and Development (R&D)": "rnd",
      "Customer Service": "customer",
      Sales: "sales",
      Marketing: "marketing",
      "Human Resources": "HR",
      "Information Technology": "IT",
      Operations: "operations",
      "Product Management": "products",
      Enterprise: "enterprise",
      Engineering: "engineering",
      Finance: "finance",
    };

    if (functionMapping[payloadDropdown.function]) {
      return functionMapping[payloadDropdown.function];
    }
  }

  if (
    payloadDropdown.function &&
    personalLists.includes(payloadDropdown.function)
  ) {
    return "personal";
  }

  return "";
};

export const truncateFileName = (fileName, maxLength = 20) => {
  const extIndex = fileName.lastIndexOf(".");
  if (extIndex === -1 || extIndex === 0) return fileName;

  const ext = fileName.slice(extIndex);
  const name = fileName.slice(0, extIndex);

  if (fileName.length <= maxLength) {
    return fileName;
  }

  const truncatedName = name.slice(0, maxLength - ext.length - 3);
  return `${truncatedName}...${ext}`;
};

export const randomizeRelatedQuestions = (questions) => {
  const questionEntries = Object.entries(questions).filter(
    ([key, value]) => value.trim() !== ""
  );

  if (questionEntries.length > 4) {
    const shuffledEntries = questionEntries.sort(() => 0.5 - Math.random());
    const selectedEntries = shuffledEntries.slice(0, 4);
    return selectedEntries.reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});
  }

  return questionEntries.reduce((result, [key, value]) => {
    result[key] = value;
    return result;
  }, {});
};

export const loadPersonalData = (
  personalData,
  setPersonalOptions,
  setSelectedExplore,
  setSelectedDropdown,
  setPayloadDropdown,
  setRelatedQuestions,
  setOkrs,
  selectedQuestions
) => {
  if (personalData?.Functions?.length > 0) {
    const validFunctions = personalData.Functions.filter((func) => {
      const validRoles = func.Roles.filter(
        (role) => role.Role && role.description
      );
      func.Roles = validRoles;
      return func.Function && validRoles.length > 0;
    });
    if (validFunctions.length > 0) {
      setPersonalOptions(validFunctions);
      const defaultFunction = validFunctions[0];
      const defaultRole = defaultFunction.Roles[0];
      setSelectedExplore(defaultRole.Role);
      setSelectedDropdown(defaultFunction.Function);
      setPayloadDropdown({
        function: defaultFunction.Function,
        role: defaultRole.Role,
        description: defaultRole.description,
      });

      const randomizedQuestions = [];

      selectedQuestions?.forEach((key) => {
        if (defaultRole.relatedQuestions[key]) {
          randomizedQuestions.push(defaultRole.relatedQuestions[key]);
        }
      });

      setRelatedQuestions(randomizedQuestions);
      setOkrs(defaultRole.okrs || {});
    }
  }
};

export const loadEnterpriseData = (enterpriseData, setEnterpriseOptions) => {
  if (enterpriseData?.Functions?.length > 0) {
    setEnterpriseOptions(enterpriseData.Functions);
  }
};

export const isMarkdown = (text) => {
  const markupPattern = /<\/?[a-z][\s\S]*>/i;
  const hasMarkup = markupPattern.test(text);
  return !hasMarkup;
};
