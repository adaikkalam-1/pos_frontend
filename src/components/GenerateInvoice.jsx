import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const GenerateInvoice = (newData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("INVOICE", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Invoice No: ${newData?.sale?.invoice_no}`, 14, 35);
  doc.text(`Date: ${new Date(newData?.sale?.created_at).toLocaleDateString()}`, 14, 42);
 

 
  autoTable(doc, {
    startY: 60,
    head: [["#", "Product", "Qty", "Price", "Subtotal"]],
    body: newData?.items?.map((item, index) => [
      index + 1,
      item.product_name,
      item.quantity,
      `$${item.price}`,
      `$${item.line_total}`,
    ]),
    theme: "grid",
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    bodyStyles: { fontSize: 11 },
  });

  const finalY = doc.lastAutoTable.finalY || 70;
  doc.setFontSize(14);
  doc.text(`Total: $${newData?.sale?.total_amount}`, 150, finalY + 10);

  doc.setFontSize(10);
  doc.text("Thank you for your purchase!", 105, finalY + 30, { align: "center" });

  doc.save(`invoice_${newData?.sale?.invoice_no}.pdf`);
};
