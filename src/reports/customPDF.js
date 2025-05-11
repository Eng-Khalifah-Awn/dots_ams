import { jsPDF } from 'jspdf';
import { callAddFont } from "@/reports/configures/fonts/Vazirmatn-VariableFont_wght-normal.js";
import autoTable from "jspdf-autotable";
import {imgTools} from "@/reports/configures/img/tools.js";
import {imgDots} from "@/reports/configures/img/dots.js";
import {imgWosol} from "@/reports/configures/img/wosol.js";

jsPDF.API.events.push(['addFonts', callAddFont]);



export function dotsEmployeeCustodyPDF(date_today, name_employee, id_employee, name_of_position, custodyItems) {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    doc.setFont("Vazirmatn-VariableFont_wght");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Set all text color to blue

// Centered Header Image
    doc.addImage(imgDots, 'PNG', 80, 10, 50, 20); // Adjust x/y/width/height as needed

// Main Title and Intro Text
    doc.text("الموضــــــــوع :  استلام عهدة", 105, 40, { align: "center" });
    doc.text(`المــــــــوافــــق : ${date_today} م .`, 105, 48, { align: "center" });

    doc.setFontSize(11);
    doc.text(
        `أقر أنا الموقع أدناه /  ${name_employee} اقامة رقم )${id_employee}( الوظيفة ${name_of_position} ، أقر بأنني استلمت العهدة المذكورة أدناه وأتعهد بالمحافظة عليها وحمايتها من الضياع أو التلف أو السرقة وأتعهد بإعادتها في حالة طلبها من قبل الشركة .`,
        105,
        60,
        { align: "center", maxWidth: 180 }
    );

// Custody Items Table
    autoTable(doc, {
        margin: { left: 15, right: 15 },
        startY: 80,
        head: [["ملاحظات", "الحالة", "الكمية", "اسم العهدة", "#"]],
        body: custodyItems.map((item, index) => [
            item.note,
            item.condition,
            item.count,
            item.name,
            index + 1
        ]),
        styles: {
            font: "Vazirmatn-VariableFont_wght",
            fontSize: 9,
            halign: "right",
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            halign:'right',

        },
        bodyStyles: {
            textColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            halign:'right',

        }
    });

// Signature Section
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`: المستلم`, 190, finalY);
    doc.text(`الاسم : ${name_employee}`, 178, finalY + 10);
    doc.text(`: الـتـوقـيـع`, 190, finalY + 20);
    doc.text(`التاريخ: ${date_today}`, 175, finalY + 30);


    doc.text(`توقيع مسؤول تقنية المعلومات : خليفة الشرعبي`, 208, finalY + 45, { align: "right" });

// Footer
    doc.setFontSize(8);
    doc.text(
        `DOTS, C.R. 1010331080\nAlared District, Abu-Baker Al Sideeq Road,\nRiyadh 13335, Building 7144, Saudi Arabia`,
        15,
        280
    );
    doc.text(
        `نقاط س.ت. 1010331080\nحي العارض ، طريق أبو بكر الصديق،\nالرياض 13335، مبنى 7144، السعودية`,
        200,
        280,
        { align: "right" }
    );

    // Save the PDF with the name of the employee

    /*const filename = `${name_employee}_${id_employee}.pdf`; // Use the name of the employee as the filename
    doc.save(filename);*/

    // Show the PDF in a new browser tab (without saving)
    const blob = doc.output("blob");
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");


    /*// Print Preview
        const blob = doc.output("blob");
        const blobUrl = URL.createObjectURL(blob);

        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        iframe.src = blobUrl;
        document.body.appendChild(iframe);

        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };*/


}

export function toolsEmployeeCustodyPDF(date_today, name_employee, id_employee, name_of_position, custodyItems) {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    doc.setFont("Vazirmatn-VariableFont_wght");
    doc.setFontSize(12);
    doc.setTextColor(227, 112, 92); // Set all text color to blue

// Centered Header Image
    doc.addImage(imgTools, 'PNG', 80, 10, 50, 20); // Adjust x/y/width/height as needed

// Main Title and Intro Text
    doc.text("الموضــــــــوع :  استلام عهدة", 105, 40, { align: "center" });
    doc.text(`المــــــــوافــــق : ${date_today} م .`, 105, 48, { align: "center" });

    doc.setFontSize(11);
    doc.text(
        `أقر أنا الموقع أدناه /  ${name_employee} اقامة رقم )${id_employee}( الوظيفة ${name_of_position} ، أقر بأنني استلمت العهدة المذكورة أدناه وأتعهد بالمحافظة عليها وحمايتها من الضياع أو التلف أو السرقة وأتعهد بإعادتها في حالة طلبها من قبل الشركة .`,
        105,
        60,
        { align: "center", maxWidth: 180 }
    );

// Custody Items Table
    autoTable(doc, {
        margin: { left: 15, right: 15 },
        startY: 80,
        head: [["ملاحظات", "الحالة", "الكمية", "اسم العهدة", "#"]],
        body: custodyItems.map((item, index) => [
            item.note,
            item.condition,
            item.count,
            item.name,
            index + 1
        ]),
        styles: {
            font: "Vazirmatn-VariableFont_wght",
            fontSize: 9,
            halign: "right",
            textColor: "#E3705C",
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            halign:'right',

        },
        bodyStyles: {
            textColor: [227, 112, 92],
            fillColor: [255, 255, 255],
            halign:'right',

        }
    });

// Signature Section
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`: المستلم`, 190, finalY);
    doc.text(`الاسم : ${name_employee}`, 178, finalY + 10);
    doc.text(`: الـتـوقـيـع`, 190, finalY + 20);
    doc.text(`التاريخ: ${date_today}`, 175, finalY + 30);


    doc.text(`توقيع مسؤول تقنية المعلومات : خليفة الشرعبي`, 208, finalY + 45, { align: "right" });

// Footer
    doc.setFontSize(8);
    doc.text(
        `DOTS, C.R. 1010331080\nAlared District, Abu-Baker Al Sideeq Road,\nRiyadh 13335, Building 7144, Saudi Arabia`,
        15,
        280
    );
    doc.text(
        `نقاط س.ت. 1010331080\nحي العارض ، طريق أبو بكر الصديق،\nالرياض 13335، مبنى 7144، السعودية`,
        200,
        280,
        { align: "right" }
    );

    // Save the PDF with the name of the employee

    /*const filename = `${name_employee}_${id_employee}.pdf`; // Use the name of the employee as the filename
    doc.save(filename);*/

    // Show the PDF in a new browser tab (without saving)
    const blob = doc.output("blob");
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");


    /*// Print Preview
        const blob = doc.output("blob");
        const blobUrl = URL.createObjectURL(blob);

        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        iframe.src = blobUrl;
        document.body.appendChild(iframe);

        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };*/


}

export function wosolEmployeeCustodyPDF(date_today, name_employee, id_employee, name_of_position, custodyItems) {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    doc.setFont("Vazirmatn-VariableFont_wght");
    doc.setFontSize(12);
    doc.setTextColor(43, 60, 115); // Set all text color to blue

// Centered Header Image
    doc.addImage(imgWosol, 'PNG', 80, 10, 50, 20); // Adjust x/y/width/height as needed

// Main Title and Intro Text
    doc.text("الموضــــــــوع :  استلام عهدة", 105, 40, { align: "center" });
    doc.text(`المــــــــوافــــق : ${date_today} م .`, 105, 48, { align: "center" });

    doc.setFontSize(11);
    doc.text(
        `أقر أنا الموقع أدناه /  ${name_employee} اقامة رقم )${id_employee}( الوظيفة ${name_of_position} ، أقر بأنني استلمت العهدة المذكورة أدناه وأتعهد بالمحافظة عليها وحمايتها من الضياع أو التلف أو السرقة وأتعهد بإعادتها في حالة طلبها من قبل الشركة .`,
        105,
        60,
        { align: "center", maxWidth: 180 }
    );

// Custody Items Table
    autoTable(doc, {
        margin: { left: 15, right: 15 },
        startY: 80,
        head: [["ملاحظات", "الحالة", "الكمية", "اسم العهدة", "#"]],
        body: custodyItems.map((item, index) => [
            item.note,
            item.condition,
            item.count,
            item.name,
            index + 1
        ]),
        styles: {
            font: "Vazirmatn-VariableFont_wght",
            fontSize: 9,
            halign: "right",
            textColor: "#2B3C73",
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            halign:'right',

        },
        bodyStyles: {
            textColor: [43, 60, 115],
            fillColor: [255, 255, 255],
            halign:'right',

        }
    });

// Signature Section
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`: المستلم`, 190, finalY);
    doc.text(`الاسم : ${name_employee}`, 150, finalY + 10);
    doc.text(`: الـتـوقـيـع`, 190, finalY + 20);
    doc.text(`التاريخ: ${date_today}`, 175, finalY + 30);


    doc.text(`توقيع مسؤول تقنية المعلومات : خليفة الشرعبي`, 208, finalY + 45, { align: "right" });

// Footer
    doc.setFontSize(8);
    doc.text(
        `DOTS, C.R. 1010331080\nAlared District, Abu-Baker Al Sideeq Road,\nRiyadh 13335, Building 7144, Saudi Arabia`,
        15,
        280
    );
    doc.text(
        `نقاط س.ت. 1010331080\nحي العارض ، طريق أبو بكر الصديق،\nالرياض 13335، مبنى 7144، السعودية`,
        200,
        280,
        { align: "right" }
    );

    // Save the PDF with the name of the employee

    /*const filename = `${name_employee}_${id_employee}.pdf`; // Use the name of the employee as the filename
    doc.save(filename);*/

    // Show the PDF in a new browser tab (without saving)
    const blob = doc.output("blob");
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");


    /*// Print Preview
        const blob = doc.output("blob");
        const blobUrl = URL.createObjectURL(blob);

        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "0";
        iframe.src = blobUrl;
        document.body.appendChild(iframe);

        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };*/


}

export function custodyEmployeePDF(nameInvoiceType,orderSummary, invoiceNumber, buttonType, restaurantName, totalPrice, currentDate, currentTime) {
    // Initialize jsPDF

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 200],

    });

    // Set default font to support Arabic
    doc.setFont("Vazirmatn-VariableFont_wght");

    // Add Invoice Header
    doc.setFontSize(8);
    doc.text(`رقم الطلب: ${invoiceNumber}`, 5, 5, );
    doc.text(`التاريخ: ${currentDate}`, 7, 9, );
    doc.text(`الوقت: ${currentTime}`, 9, 13, );

    doc.setFontSize(12);
    // doc.text(`${nameInvoiceType}`, 35,9, );
    doc.addImage(imgTools, 'png', 35,0,20,20, );
    doc.setFontSize(8);
    doc.text(`مطاعم القرموشي `, 55, 5, );
    doc.text(`للفول الجره والتميز`, 54, 9, );
    doc.text(`${restaurantName}`, 58, 13, );



    // Prepare table headers and rows
    const headers = [["الإجمالي", "اسم الوجبة", "الكمية"]];
    const data = orderSummary.map((item) => [
        item.total || "",
        item.mealName + (item.singleOptionName ? `\n${item.singleOptionName}` : "") || "",
        item.count || "",
    ]);

    // Add Table with autoTable
    autoTable(doc, {
        margin: {left: 2, right: 2},
        startY: 15,
        tableLineWidth:0.3,
        head: headers,
        body: data,
        theme: 'grid',
        pageBreak: 'avoid',
        styles:{
          font:'Vazirmatn-VariableFont_wght',
            fontSize: 7,
            halign:'right',
            lineWidth: 0.5, // Set the line thickness
        },
        headStyles: {
            fillColor: [255,255,255],
            textColor: [0, 0, 0], // Black text
            halign: "right",
            fontSize: 7,
        },
        bodyStyles: {
            textColor: [0,0,0],
            fillColor: [255,255,255],
            fontSize: 6,
            halign: "right", // Right alignment for body
        },

    });

    // Add Total Price Inside a Bordered Box
    const yPosition = doc.lastAutoTable.finalY + 8;
    const boxX = 40;
    const boxWidth = 80;
    const boxHeight = 15;

    // Draw Border
    doc.rect(boxX - boxWidth / 2, yPosition - 5, boxWidth, boxHeight); // Centered box
    doc.text(`الإجمـــــــــــــــــــــــــــــــــــــــــــــــــالي: ${totalPrice} ريال`, boxX, yPosition + 2.5, { align: "center" });

    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);

// Create a hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.src = blobUrl;

    document.body.appendChild(iframe);

    iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        /*setTimeout(() => {

        }, 500);*/
    };


}



















