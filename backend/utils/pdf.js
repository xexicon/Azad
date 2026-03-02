const axios = require("axios");
const fs = require("fs");
const path = require("path");
const fontkit = require("@pdf-lib/fontkit");
const { PDFDocument, rgb } = require("pdf-lib");
const cloudinary = require("../config/cloudinary");

async function downloadTemplatePdfBuffer() {
  const publicId = process.env.TICKET_TEMPLATE_PUBLIC_ID;
  if (!publicId) throw new Error("TICKET_TEMPLATE_PUBLIC_ID is missing");

  const url = cloudinary.url(publicId, { resource_type: "raw" });
  const res = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(res.data);
}

async function generateTicketPdf({ buyerName, ticketCode, ticketNo }) {
  const templateBuffer = await downloadTemplatePdfBuffer();
  const pdfDoc = await PDFDocument.load(templateBuffer);

  pdfDoc.registerFontkit(fontkit);

  const poppinsRegularBytes = fs.readFileSync(
    path.join(process.cwd(), "assets", "fonts", "Poppins-Regular.ttf")
  );
  const poppinsBoldBytes = fs.readFileSync(
    path.join(process.cwd(), "assets", "fonts", "Poppins-Bold.ttf")
  );

  const poppins = await pdfDoc.embedFont(poppinsRegularBytes);
  const poppinsBold = await pdfDoc.embedFont(poppinsBoldBytes);

  const firstPage = pdfDoc.getPages()[0];
  const { width, height } = firstPage.getSize();

  // --------- POSITION SETTINGS ----------
  // Name: move a bit UP
  const NAME_X = 260;
  const NAME_Y = 130.5; // was 106.5 -> moved up (~12 pts)
  const NAME_SIZE = 24;

  // Ticket code: bottom-right
  const CODE_SIZE = 10;
  const MARGIN_RIGHT = 22;
  const MARGIN_BOTTOM = 18;

  // if you want ONLY the code:
  const codeText = `${ticketCode}`;

  // If you want with label:
  // const codeText = `Ticket ID: ${ticketCode}`;

  // Right-align text
  const codeTextWidth = poppins.widthOfTextAtSize(codeText, CODE_SIZE);
  const CODE_X = width - MARGIN_RIGHT - codeTextWidth;
  const CODE_Y = MARGIN_BOTTOM;

  const WHITE = rgb(1, 1, 1);
  // -------------------------------------

  firstPage.drawText(String(buyerName || ""), {
    x: NAME_X,
    y: NAME_Y,
    size: NAME_SIZE,
    font: poppinsBold,
    color: WHITE,
  });

  firstPage.drawText(codeText, {
    x: CODE_X,
    y: CODE_Y,
    size: CODE_SIZE,
    font: poppins,
    color: WHITE,
  });

  const outBytes = await pdfDoc.save();
  return Buffer.from(outBytes);
}

module.exports = { generateTicketPdf };