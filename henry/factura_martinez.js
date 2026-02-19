const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

const stream = fs.createWriteStream('/tmp/factura_martinez.pdf');
doc.pipe(stream);

// Colores
const DORADO = '#C9A227';
const GRIS_OSCURO = '#333333';

// Cabecera con logo/nombre
doc.fontSize(24).fillColor(DORADO).font('Helvetica-Bold').text('DERECHO VIRTUAL', 50, 50);
doc.fontSize(10).fillColor(GRIS_OSCURO).font('Helvetica').text('Servicios Jurídicos Profesionales', 50, 78);

// Línea separadora
doc.moveTo(50, 100).lineTo(545, 100).strokeColor(DORADO).lineWidth(2).stroke();

// FACTURA título
doc.fontSize(28).fillColor(GRIS_OSCURO).font('Helvetica-Bold').text('FACTURA', 400, 50, { align: 'right' });

// Número y fecha de factura
const hoy = new Date();
const numFactura = `2026/${String(hoy.getMonth() + 1).padStart(2, '0')}${String(hoy.getDate()).padStart(2, '0')}-001`;
doc.fontSize(10).font('Helvetica');
doc.text(`Nº Factura: ${numFactura}`, 400, 85, { align: 'right' });
doc.text(`Fecha: 12 de febrero de 2026`, 400, 98, { align: 'right' });

// Datos del emisor
doc.fontSize(11).font('Helvetica-Bold').fillColor(DORADO).text('EMISOR', 50, 130);
doc.fontSize(10).font('Helvetica').fillColor(GRIS_OSCURO);
doc.text('Carlos Rivero García', 50, 148);
doc.text('Derecho Virtual', 50, 161);
doc.text('NIF: [NIF CARLOS]', 50, 174);
doc.text('Dirección: [DIRECCIÓN DESPACHO]', 50, 187);
doc.text('Sevilla', 50, 200);
doc.text('Email: contacto@derechovirtual.com', 50, 213);

// Datos del cliente
doc.fontSize(11).font('Helvetica-Bold').fillColor(DORADO).text('CLIENTE', 300, 130);
doc.fontSize(10).font('Helvetica').fillColor(GRIS_OSCURO);
doc.text('D. Francisco Javier Martínez López', 300, 148);
doc.text('DNI: 28.456.913-L', 300, 161);
doc.text('Domicilio: Sevilla', 300, 174);
doc.text('Teléfono: 6XX XXX XXX', 300, 187);
doc.text('Email: fjmartinez@email.com', 300, 200);

// Línea separadora
doc.moveTo(50, 240).lineTo(545, 240).strokeColor('#CCCCCC').lineWidth(1).stroke();

// Tabla de conceptos - Cabecera
doc.rect(50, 260, 495, 25).fillColor(DORADO).fill();
doc.fontSize(10).font('Helvetica-Bold').fillColor('white');
doc.text('CONCEPTO', 60, 268);
doc.text('CANTIDAD', 320, 268);
doc.text('PRECIO', 390, 268);
doc.text('TOTAL', 480, 268);

// Fila de concepto
doc.rect(50, 285, 495, 40).fillColor('#F9F9F9').fill();
doc.fillColor(GRIS_OSCURO).font('Helvetica');
doc.text('Redacción de Contrato de Arrendamiento de Vivienda', 60, 295, { width: 240 });
doc.text('Blindado pro-arrendador (LAU + Ley 12/2023 + LO 1/2025)', 60, 308, { width: 240 });
doc.text('1', 340, 300);
doc.text('300,00 €', 380, 300);
doc.text('300,00 €', 470, 300);

// Línea
doc.moveTo(50, 325).lineTo(545, 325).strokeColor('#CCCCCC').lineWidth(0.5).stroke();

// Totales
doc.rect(350, 350, 195, 90).fillColor('#F5F5F5').fill();

doc.fontSize(10).font('Helvetica').fillColor(GRIS_OSCURO);
doc.text('Base Imponible:', 360, 360);
doc.text('247,93 €', 480, 360, { align: 'right', width: 55 });

doc.text('IVA (21%):', 360, 380);
doc.text('52,07 €', 480, 380, { align: 'right', width: 55 });

doc.moveTo(360, 400).lineTo(535, 400).strokeColor(DORADO).lineWidth(1).stroke();

doc.fontSize(12).font('Helvetica-Bold').fillColor(DORADO);
doc.text('TOTAL:', 360, 410);
doc.text('300,00 €', 480, 410, { align: 'right', width: 55 });

// Forma de pago
doc.fontSize(11).font('Helvetica-Bold').fillColor(DORADO).text('FORMA DE PAGO', 50, 350);
doc.fontSize(10).font('Helvetica').fillColor(GRIS_OSCURO);
doc.text('Transferencia bancaria', 50, 368);
doc.text('IBAN: ES__ ____ ____ ____ ____ ____', 50, 381);
doc.text('Titular: Carlos Rivero García', 50, 394);
doc.text('Concepto: Factura ' + numFactura, 50, 407);

// Notas
doc.fontSize(11).font('Helvetica-Bold').fillColor(DORADO).text('OBSERVACIONES', 50, 460);
doc.fontSize(9).font('Helvetica').fillColor(GRIS_OSCURO);
doc.text('Servicio prestado: Redacción de contrato de arrendamiento de vivienda para el inmueble sito en Avda. de Coria nº 43, 3º B, 41010 Sevilla.', 50, 478, { width: 495 });
doc.text('Incluye: Contrato completo con 20 cláusulas de blindaje, Anexo I (Inventario) y Anexo II (Acta de entrega de llaves).', 50, 505, { width: 495 });

// Pie de página
doc.moveTo(50, 750).lineTo(545, 750).strokeColor(DORADO).lineWidth(1).stroke();
doc.fontSize(8).fillColor('#666666').font('Helvetica');
doc.text('Derecho Virtual - Servicios Jurídicos | www.derechovirtual.com | contacto@derechovirtual.com', 50, 760, { align: 'center', width: 495 });
doc.text('Factura emitida conforme a la normativa fiscal vigente. IVA incluido.', 50, 772, { align: 'center', width: 495 });

doc.end();

stream.on('finish', () => {
  console.log('Factura generada: /tmp/factura_martinez.pdf');
});
