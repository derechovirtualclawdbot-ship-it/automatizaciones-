const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

const stream = fs.createWriteStream('/tmp/hoja_encargo_desahucio.pdf');
doc.pipe(stream);

const DORADO = '#B8860B';
const GRIS = '#333333';
const GRIS_CLARO = '#666666';
const FONDO = '#F5EBD7';

// Cabecera
doc.fontSize(22).fillColor(DORADO).font('Helvetica-Bold').text('DERECHO VIRTUAL', 50, 50);
doc.fontSize(9).fillColor(GRIS_CLARO).font('Helvetica').text('Servicios Jurídicos Profesionales', 50, 75);

doc.fontSize(16).fillColor(GRIS).font('Helvetica-Bold').text('HOJA DE ENCARGO PROFESIONAL', 280, 55, { align: 'right' });
doc.fontSize(10).font('Helvetica').text('Fecha: 20 de febrero de 2027', 280, 78, { align: 'right' });

doc.moveTo(50, 100).lineTo(545, 100).strokeColor(DORADO).lineWidth(2).stroke();

// DATOS DEL LETRADO
doc.rect(50, 115, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('1. DATOS DEL LETRADO', 55, 119);

doc.fontSize(10).fillColor(GRIS).font('Helvetica');
doc.text('Nombre: Carlos Rivero García', 55, 142);
doc.text('Nº Colegiado: [Nº COLEGIADO ICASEVILLA]', 300, 142);
doc.text('Domicilio profesional: [DIRECCIÓN DESPACHO], Sevilla', 55, 158);
doc.text('Email: contacto@derechovirtual.com', 55, 174);
doc.text('Teléfono: [TELÉFONO]', 300, 174);

// DATOS DEL CLIENTE
doc.rect(50, 200, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('2. DATOS DEL CLIENTE', 55, 204);

doc.fontSize(10).fillColor(GRIS).font('Helvetica');
doc.text('Nombre: D. Francisco Javier Martínez López', 55, 227);
doc.text('DNI: 28.456.913-L', 350, 227);
doc.text('Domicilio: Sevilla', 55, 243);
doc.text('Teléfono: 6XX XXX XXX', 55, 259);
doc.text('Email: fjmartinez@email.com', 300, 259);

// OBJETO DEL ENCARGO
doc.rect(50, 285, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('3. OBJETO DEL ENCARGO', 55, 289);

doc.fontSize(10).fillColor(GRIS).font('Helvetica');
doc.text('PROCEDIMIENTO DE DESAHUCIO POR FALTA DE PAGO', 55, 312, { underline: true });
doc.text('con acumulación de reclamación de cantidades debidas', 55, 326);

doc.moveDown(0.5);
doc.text('Inmueble objeto del procedimiento:', 55, 348, { continued: true }).font('Helvetica-Bold').text(' Avda. de Coria nº 43, 3º B, 41010 Sevilla');
doc.font('Helvetica');
doc.text('Demandados:', 55, 364, { continued: true }).font('Helvetica-Bold').text(' Dña. María Elena Ruiz García (DNI 30.987.654-T) y D. Carlos Jiménez Ortega');

doc.font('Helvetica');
doc.text('Deuda reclamada a fecha actual:', 55, 388);
doc.text('  • Renta enero 2027: 1.150,00 €', 70, 404);
doc.text('  • Renta febrero 2027: 1.150,00 €', 70, 418);
doc.font('Helvetica-Bold').text('  • TOTAL PRINCIPAL: 2.300,00 €', 70, 434);
doc.font('Helvetica').text('  (más las rentas que se devenguen hasta el efectivo lanzamiento)', 70, 450);

// SERVICIOS INCLUIDOS
doc.rect(50, 475, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('4. SERVICIOS PROFESIONALES INCLUIDOS', 55, 479);

doc.fontSize(9).fillColor(GRIS).font('Helvetica');
const servicios = [
  '✓ Estudio jurídico del caso y documentación',
  '✓ Requerimiento previo MASC (Oferta Vinculante Confidencial) conforme LO 1/2025',
  '✓ Redacción y envío de burofax de requerimiento de pago',
  '✓ Redacción de demanda de desahucio por falta de pago (art. 250.1.1º LEC)',
  '✓ Acumulación de acción de reclamación de rentas debidas',
  '✓ Solicitud de decreto de lanzamiento con fecha abierta',
  '✓ Interposición de la demanda y seguimiento del procedimiento',
  '✓ Asistencia a juicio verbal (si hubiere oposición)',
  '✓ Solicitud de ejecución de sentencia y lanzamiento',
  '✓ Coordinación con Procurador para el lanzamiento efectivo',
  '✓ Gestiones para recuperación de la posesión del inmueble'
];
let y = 502;
servicios.forEach(s => {
  doc.text(s, 60, y);
  y += 14;
});

// HONORARIOS
doc.rect(50, y + 10, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('5. HONORARIOS PROFESIONALES', 55, y + 14);

y += 40;
doc.fontSize(10).fillColor(GRIS).font('Helvetica');
doc.text('Los honorarios se pactan a tanto alzado (presupuesto cerrado):', 55, y);
y += 20;

doc.rect(55, y, 200, 50).fillColor('#FFF9E6').fill().strokeColor(DORADO).stroke();
doc.fontSize(10).font('Helvetica').fillColor(GRIS).text('Base imponible:', 65, y + 10);
doc.text('IVA (21%):', 65, y + 25);
doc.font('Helvetica-Bold').fillColor(DORADO).text('TOTAL:', 65, y + 40);

doc.font('Helvetica').fillColor(GRIS).text('2.066,12 €', 180, y + 10);
doc.text('433,88 €', 180, y + 25);
doc.font('Helvetica-Bold').fontSize(12).fillColor(DORADO).text('2.500,00 €', 175, y + 40);

doc.fontSize(9).font('Helvetica').fillColor(GRIS_CLARO);
doc.text('No incluidos: tasas judiciales (si aplicables), derechos de Procurador, gastos de burofax,', 270, y + 5);
doc.text('publicaciones, ejecución forzosa ni servicios de cerrajero para el lanzamiento.', 270, y + 18);

// Nueva página
doc.addPage();

// PROCEDIMIENTO
doc.rect(50, 50, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('6. FASES DEL PROCEDIMIENTO', 55, 54);

doc.fontSize(10).fillColor(GRIS).font('Helvetica-Bold');
doc.text('FASE 1: REQUISITO PREVIO OBLIGATORIO (MASC - LO 1/2025)', 55, 80);
doc.font('Helvetica').fontSize(9);
doc.text('Conforme a la Ley Orgánica 1/2025, antes de interponer demanda civil es obligatorio acudir a un', 55, 96);
doc.text('Medio Adecuado de Solución de Controversias (MASC). En su contrato se pactó la Oferta Vinculante', 55, 108);
doc.text('Confidencial (OVC), que permite agotar este trámite en 30 días si no hay respuesta.', 55, 120);

doc.font('Helvetica-Bold').fontSize(10);
doc.text('FASE 2: BUROFAX DE REQUERIMIENTO', 55, 145);
doc.font('Helvetica').fontSize(9);
doc.text('Ya enviado el 5/02/2027. Este requerimiento cumple el art. 22.4 LEC: si han pasado 30 días desde', 55, 161);
doc.text('el requerimiento y no han pagado, los demandados NO PODRÁN ENERVAR EL DESAHUCIO', 55, 173);
doc.text('(es decir, no podrán pagar en el último momento para paralizar el procedimiento).', 55, 185);

doc.font('Helvetica-Bold').fontSize(10);
doc.text('FASE 3: INTERPOSICIÓN DE DEMANDA DE DESAHUCIO', 55, 210);
doc.font('Helvetica').fontSize(9);
doc.text('Demanda de juicio verbal de desahucio por falta de pago (art. 250.1.1º LEC) con acumulación de', 55, 226);
doc.text('reclamación de rentas. Se solicitará decreto de lanzamiento con fecha abierta para agilizar.', 55, 238);

doc.font('Helvetica-Bold').fontSize(10);
doc.text('FASE 4: REQUERIMIENTO JUDICIAL Y POSIBLES ESCENARIOS', 55, 263);
doc.font('Helvetica').fontSize(9);
doc.text('El Juzgado requerirá a los demandados. Pueden ocurrir tres cosas:', 55, 279);
doc.text('  a) Desalojan voluntariamente → Fin del procedimiento, recupera la vivienda.', 60, 295);
doc.text('  b) No contestan ni pagan → Sentencia estimatoria sin juicio, se fija fecha de lanzamiento.', 60, 309);
doc.text('  c) Se oponen → Juicio verbal, sentencia y posterior lanzamiento.', 60, 323);

doc.font('Helvetica-Bold').fontSize(10);
doc.text('FASE 5: LANZAMIENTO Y RECUPERACIÓN DE LA VIVIENDA', 55, 348);
doc.font('Helvetica').fontSize(9);
doc.text('El lanzamiento es la diligencia judicial por la que se expulsa a los ocupantes y se le entrega', 55, 364);
doc.text('la posesión del inmueble. Se coordina con la Comisión Judicial y, si es necesario, cerrajero.', 55, 376);

doc.rect(50, 400, 495, 50).fillColor('#E8F5E9').fill().strokeColor('#4CAF50').stroke();
doc.fontSize(10).font('Helvetica-Bold').fillColor('#2E7D32');
doc.text('PLAZO ESTIMADO TOTAL: 4-8 meses', 60, 410);
doc.font('Helvetica').fontSize(9).fillColor('#333');
doc.text('Este plazo depende de la carga del Juzgado y de si hay oposición. Al haber enviado requerimiento previo,', 60, 428);
doc.text('se evita la enervación, lo que acelera significativamente el procedimiento.', 60, 440);

// ADVERTENCIAS
doc.rect(50, 470, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('7. ADVERTENCIAS LEGALES', 55, 474);

doc.fontSize(8).fillColor(GRIS).font('Helvetica');
const advertencias = [
  '1. El cliente es informado de que existe la posibilidad de condena en costas si la parte contraria se opone y el resultado es desfavorable.',
  '2. El ejercicio de acciones puede resultar infructuoso si los demandados son insolventes, sin perjuicio de la recuperación de la posesión.',
  '3. El Letrado está sujeto a la Ley 10/2010, de 28 de abril, de prevención del blanqueo de capitales, debiendo identificar al cliente.',
  '4. El Letrado podrá delegar en colaboradores de su confianza sin incremento de honorarios, siempre bajo su supervisión.',
  '5. El resultado del procedimiento depende de factores ajenos al Letrado (decisión judicial, actuación de la contraparte, etc.).',
  '6. Los honorarios pactados no incluyen recursos extraordinarios, incidentes de ejecución complejos o segundas instancias.'
];
let yAdv = 498;
advertencias.forEach(a => {
  doc.text(a, 55, yAdv, { width: 485 });
  yAdv += 22;
});

// FORMA DE PAGO
doc.rect(50, yAdv + 10, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('8. FORMA DE PAGO', 55, yAdv + 14);

doc.fontSize(9).fillColor(GRIS).font('Helvetica');
doc.text('Pago mediante transferencia bancaria a la cuenta:', 55, yAdv + 40);
doc.font('Helvetica-Bold').text('IBAN: ES__ ____ ____ ____ ____ ____', 55, yAdv + 54);
doc.font('Helvetica').text('Titular: Carlos Rivero García', 55, yAdv + 68);
doc.text('Concepto: Encargo desahucio Martínez López', 55, yAdv + 82);

doc.text('Modalidad: 50% a la firma del presente encargo (1.250 €) y 50% restante a la interposición de la demanda.', 55, yAdv + 102);

// Nueva página - FIRMAS
doc.addPage();

// PROTECCIÓN DE DATOS
doc.rect(50, 50, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('9. PROTECCIÓN DE DATOS', 55, 54);

doc.fontSize(8).fillColor(GRIS).font('Helvetica');
doc.text('En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa al cliente de que sus datos personales serán tratados por el Letrado con la finalidad de prestar los servicios jurídicos contratados, siendo la base legitimadora la ejecución del contrato. Los datos se conservarán durante la vigencia de la relación profesional y el tiempo necesario para atender posibles responsabilidades. El cliente puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición dirigiéndose al domicilio profesional indicado.', 55, 78, { width: 485, align: 'justify' });

// ACEPTACIÓN
doc.rect(50, 150, 495, 18).fillColor(FONDO).fill();
doc.fontSize(11).fillColor(DORADO).font('Helvetica-Bold').text('10. ACEPTACIÓN DEL ENCARGO', 55, 154);

doc.fontSize(9).fillColor(GRIS).font('Helvetica');
doc.text('El cliente declara:', 55, 180);
doc.text('☐ Haber leído y comprendido íntegramente el contenido de la presente hoja de encargo.', 60, 198);
doc.text('☐ Haber sido informado de los honorarios, gastos y posibles resultados del procedimiento.', 60, 214);
doc.text('☐ Aceptar expresamente las condiciones establecidas y encargar los servicios descritos.', 60, 230);
doc.text('☐ Autorizar el tratamiento de sus datos personales conforme a lo indicado.', 60, 246);

doc.text('Y para que así conste, ambas partes firman la presente hoja de encargo por duplicado y a un solo efecto.', 55, 275);

doc.text('En Sevilla, a 20 de febrero de 2027', 55, 300);

// Firmas
doc.moveTo(55, 380).lineTo(250, 380).strokeColor('#CCCCCC').stroke();
doc.moveTo(300, 380).lineTo(495, 380).strokeColor('#CCCCCC').stroke();

doc.fontSize(10).font('Helvetica-Bold').fillColor(GRIS);
doc.text('EL LETRADO', 120, 390);
doc.text('EL CLIENTE', 365, 390);

doc.fontSize(9).font('Helvetica');
doc.text('Fdo.: Carlos Rivero García', 100, 410);
doc.text('Fdo.: Francisco Javier Martínez López', 320, 410);

// Pie
doc.moveTo(50, 750).lineTo(545, 750).strokeColor(DORADO).stroke();
doc.fontSize(8).fillColor(GRIS_CLARO);
doc.text('Derecho Virtual - Servicios Jurídicos | www.derechovirtual.com | contacto@derechovirtual.com', 50, 760, { align: 'center', width: 495 });

doc.end();

stream.on('finish', () => {
  console.log('Hoja de encargo generada: /tmp/hoja_encargo_desahucio.pdf');
});
