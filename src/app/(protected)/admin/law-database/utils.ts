import { jsPDF } from "jspdf";

export const downloadCSVFile = (csvContent: string, fileName: string) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export interface ParsedLaw {
  title: string;
  source: string;
  official_gazette: string;
  categoryName: string;
  subCategoryName: string;
  lastUpdated: string;
  sections: {
    title: string;
    articles: { title: string; description: string }[];
  }[];
}

export const parseCSVToLawDetails = (csvText: string): ParsedLaw => {
  const lines = csvText.split(/\r?\n/);
  
  let title = "";
  let source = "";
  let official_gazette = "";
  let categoryName = "";
  let subCategoryName = "";
  let lastUpdated = "";
  
  const sections: { title: string; articles: { title: string; description: string }[] }[] = [];
  let currentSection: { title: string; articles: { title: string; description: string }[] } | null = null;
  
  let parsingArticles = false;

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  let headerRowIndex = -1;
  let valuesRowIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("Title,") || line.startsWith("Title\t") || line.includes("OfficialGazette")) {
      headerRowIndex = i;
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim() !== "") {
          valuesRowIndex = j;
          break;
        }
      }
      break;
    }
  }

  if (headerRowIndex !== -1 && valuesRowIndex !== -1) {
    const headers = parseCSVLine(lines[headerRowIndex]);
    const values = parseCSVLine(lines[valuesRowIndex]);
    
    const titleIdx = headers.findIndex(h => h.toLowerCase().replace(/\s/g, "") === "title");
    const sourceIdx = headers.findIndex(h => h.toLowerCase().replace(/\s/g, "") === "source");
    const gazetteIdx = headers.findIndex(h => h.toLowerCase().replace(/\s/g, "") === "officialgazette");
    const categoryIdx = headers.findIndex(h => h.toLowerCase().replace(/\s/g, "") === "category");
    const subCategoryIdx = headers.findIndex(h => h.toLowerCase().replace(/\s/g, "") === "subcategory");
    const lastUpdateIdx = headers.findIndex(h => h.toLowerCase().replace(/\s/g, "") === "lastupdated");

    if (titleIdx !== -1) title = values[titleIdx] || "";
    if (sourceIdx !== -1) source = values[sourceIdx] || "";
    if (gazetteIdx !== -1) official_gazette = values[gazetteIdx] || "";
    if (categoryIdx !== -1) categoryName = values[categoryIdx] || "";
    if (subCategoryIdx !== -1) subCategoryName = values[subCategoryIdx] || "";
    if (lastUpdateIdx !== -1) lastUpdated = values[lastUpdateIdx] || "";
  }

  for (let i = Math.max(headerRowIndex, valuesRowIndex) + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;

    if (line.toLowerCase().startsWith("section:")) {
      const secTitle = line.substring(8).trim();
      currentSection = { title: secTitle, articles: [] };
      sections.push(currentSection);
      parsingArticles = false;
    } else if (line.toLowerCase().startsWith("article,description")) {
      parsingArticles = true;
    } else if (parsingArticles && currentSection) {
      const parts = parseCSVLine(line);
      if (parts.length >= 2) {
        currentSection.articles.push({
          title: parts[0],
          description: parts[1]
        });
      }
    }
  }

  return {
    title,
    source,
    official_gazette,
    categoryName,
    subCategoryName,
    lastUpdated,
    sections
  };
};

export const generateLawPDF = (law: ParsedLaw) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  const titleLines = doc.splitTextToSize(law.title || "Law Document", contentWidth);
  const titleHeight = titleLines.length * 8;
  checkPageBreak(titleHeight + 10);
  doc.text(titleLines, margin, y);
  y += titleHeight + 10;

  // Metadata
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);

  const metadata = [
    { label: "Source:", value: law.source },
    { label: "Official Gazette:", value: law.official_gazette },
    { label: "Category:", value: law.categoryName },
    { label: "Subcategory:", value: law.subCategoryName },
    { label: "Last Updated:", value: law.lastUpdated },
  ];

  metadata.forEach((item) => {
    if (item.value) {
      doc.setFont("Helvetica", "bold");
      const labelText = item.label;
      const labelWidth = doc.getTextWidth(labelText) + 2;

      doc.setFont("Helvetica", "normal");
      const valueLines = doc.splitTextToSize(String(item.value), contentWidth - labelWidth);
      const valHeight = valueLines.length * 5;

      checkPageBreak(valHeight + 4);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text(labelText, margin, y);

      doc.setFont("Helvetica", "normal");
      doc.setTextColor(120, 120, 120);
      doc.text(valueLines, margin + labelWidth, y);

      y += valHeight + 2;
    }
  });

  y += 5;

  // Divider Line
  checkPageBreak(5);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Sections & Articles
  if (law.sections && law.sections.length > 0) {
    law.sections.forEach((section) => {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(19, 85, 118);
      
      const secLines = doc.splitTextToSize(section.title, contentWidth);
      const secHeight = secLines.length * 6;
      checkPageBreak(secHeight + 8);
      doc.text(secLines, margin, y);
      y += secHeight + 6;

      if (section.articles && section.articles.length > 0) {
        section.articles.forEach((article) => {
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(40, 40, 40);

          const artLines = doc.splitTextToSize(article.title, contentWidth);
          const artHeight = artLines.length * 5;
          
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(80, 80, 80);

          const descLines = doc.splitTextToSize(article.description, contentWidth);
          const descHeight = descLines.length * 5;

          checkPageBreak(artHeight + descHeight + 12);

          doc.setFont("Helvetica", "bold");
          doc.text(artLines, margin, y);
          y += artHeight + 2;

          doc.setFont("Helvetica", "normal");
          doc.text(descLines, margin, y);
          y += descHeight + 8;
        });
      }

      y += 4;
    });
  }

  doc.save(`${(law.title || "export").replace(/\s+/g, "_")}.pdf`);
};
