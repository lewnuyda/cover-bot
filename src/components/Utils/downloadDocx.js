import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export const downloadDocx = async (content) => {
  // Add a bold title
  const title = new Paragraph({
    children: [
      new TextRun({
        text: "Application Letter",
        bold: true,
        size: 32, // 16pt (size is in half-points)
        font: "Times New Roman",
      }),
    ],
    spacing: { after: 300 }, // space after title
  });

  // Split content by new lines and create styled paragraphs
  const paragraphs = content.split(/\n+/).map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line.trim(),
            font: "Times New Roman",
            size: 24, // 12pt
          }),
        ],
        spacing: { after: 200 }, // space between paragraphs
        alignment: AlignmentType.JUSTIFIED, // Justify text
      })
  );

  const doc = new Document({
    sections: [
      {
        children: [title, ...paragraphs],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "cover_letter.docx");
};
