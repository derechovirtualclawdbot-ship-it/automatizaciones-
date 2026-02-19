const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 70, right: 70 }
});

const stream = fs.createWriteStream('/tmp/burofax_requerimiento.pdf');
doc.pipe(stream);

const GRIS = '#333333';

doc.fontSize(11).fillColor(GRIS).font('Helvetica-Bold');
doc.text('BUROFAX CON CERTIFICACIÓN DE CONTENIDO Y ACUSE DE RECIBO', { align: 'center' });
doc.moveDown(2);

// Datos remitente
doc.font('Helvetica').fontSize(10);
doc.text('REMITENTE:', { continued: true }).font('Helvetica-Bold').text(' D. Francisco Javier Martínez López');
doc.font('Helvetica').text('DNI: 28.456.913-L');
doc.text('Domicilio: Sevilla');
doc.moveDown(1);

// Datos destinatarios
doc.text('DESTINATARIOS:');
doc.font('Helvetica-Bold').text('Dña. María Elena Ruiz García');
doc.font('Helvetica').text('DNI: 30.987.654-T');
doc.font('Helvetica-Bold').text('D. Carlos Jiménez Ortega');
doc.font('Helvetica').text('Domicilio: Avda. de Coria nº 43, 3º B, 41010 Sevilla');
doc.moveDown(1);

doc.text('Fecha: 20 de febrero de 2027');
doc.moveDown(1.5);

// Asunto
doc.font('Helvetica-Bold').text('ASUNTO: REQUERIMIENTO FEHACIENTE DE PAGO DE RENTAS ADEUDADAS Y APERCIBIMIENTO DE ACCIONES LEGALES', { align: 'center' });
doc.moveDown(1.5);

// Cuerpo
doc.font('Helvetica').fontSize(10.5);

doc.text('Muy Sres. míos:', { align: 'left' });
doc.moveDown(0.8);

doc.text('Por medio del presente burofax, y en mi condición de propietario y arrendador de la vivienda que ustedes ocupan sita en Avenida de Coria nº 43, piso 3º, letra B, C.P. 41010, Sevilla, en virtud del contrato de arrendamiento de vivienda suscrito en fecha 1 de marzo de 2026, les REQUIERO FORMALMENTE para el pago de las cantidades que a continuación se detallan:', { align: 'justify' });
doc.moveDown(1);

// Deuda
doc.font('Helvetica-Bold');
doc.text('DEUDA EXIGIBLE:');
doc.font('Helvetica');
doc.text('   • Renta mensual enero 2027: 1.150,00 €');
doc.text('   • Renta mensual febrero 2027: 1.150,00 €');
doc.font('Helvetica-Bold');
doc.text('   • TOTAL ADEUDADO: 2.300,00 €');
doc.font('Helvetica');
doc.text('   (sin perjuicio de las rentas que continúen devengándose)');
doc.moveDown(1);

doc.text('El impago de las rentas constituye un INCUMPLIMIENTO GRAVE de sus obligaciones contractuales conforme al artículo 27.2.a) de la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (LAU), que faculta al arrendador para resolver el contrato de pleno derecho.', { align: 'justify' });
doc.moveDown(0.8);

doc.font('Helvetica-Bold');
doc.text('Por todo ello, les REQUIERO para que, en el PLAZO IMPRORROGABLE DE DIEZ (10) DÍAS desde la recepción del presente burofax:', { align: 'justify' });
doc.moveDown(0.5);

doc.font('Helvetica');
doc.text('1. Procedan al PAGO ÍNTEGRO de la cantidad de 2.300,00 € mediante transferencia bancaria a la cuenta IBAN ES76 2100 1234 56 0200123456, indicando como concepto "Rentas enero-febrero 2027".', { align: 'justify', indent: 20 });
doc.moveDown(0.5);

doc.text('2. ALTERNATIVAMENTE, si no van a proceder al pago, desalojen VOLUNTARIAMENTE la vivienda, entregando las llaves y dejándola libre de personas y enseres.', { align: 'justify', indent: 20 });
doc.moveDown(1);

doc.font('Helvetica-Bold').fillColor('#8B0000');
doc.text('APERCIBIMIENTO LEGAL:', { align: 'left' });
doc.fillColor(GRIS).font('Helvetica');
doc.moveDown(0.5);

doc.text('Les advierto expresamente que, de no atender el presente requerimiento en el plazo indicado, procederé SIN MÁS TRÁMITE a:', { align: 'justify' });
doc.moveDown(0.5);

doc.text('1. Interponer DEMANDA DE DESAHUCIO POR FALTA DE PAGO ante los Tribunales de Instancia de Sevilla, conforme al artículo 250.1.1º de la Ley de Enjuiciamiento Civil, con reclamación acumulada de todas las cantidades adeudadas.', { align: 'justify', indent: 20 });
doc.moveDown(0.3);

doc.text('2. Solicitar su INSCRIPCIÓN EN FICHEROS DE SOLVENCIA PATRIMONIAL Y CRÉDITO (registros de morosos), lo que afectará gravemente a su historial crediticio y dificultará su acceso a financiación, alquileres futuros y contratación de servicios.', { align: 'justify', indent: 20 });
doc.moveDown(0.3);

doc.text('3. Reclamar, además del principal adeudado, los INTERESES DE DEMORA, las COSTAS PROCESALES y la INDEMNIZACIÓN POR DAÑOS Y PERJUICIOS derivados de su incumplimiento.', { align: 'justify', indent: 20 });
doc.moveDown(0.3);

doc.text('4. En caso de no desalojar voluntariamente tras la sentencia, solicitar el LANZAMIENTO FORZOSO con intervención de la Comisión Judicial, cerrajero y, en su caso, Fuerzas y Cuerpos de Seguridad del Estado.', { align: 'justify', indent: 20 });
doc.moveDown(1);

doc.font('Helvetica-Bold');
doc.text('ADVERTENCIA IMPORTANTE SOBRE LA ENERVACIÓN:', { align: 'left' });
doc.font('Helvetica');
doc.moveDown(0.3);

doc.text('El presente requerimiento cumple lo dispuesto en el artículo 22.4 de la Ley de Enjuiciamiento Civil. Ello implica que, una vez transcurrido el plazo de TREINTA (30) DÍAS desde esta comunicación sin que hayan satisfecho íntegramente la deuda, PERDERÁN EL DERECHO A ENERVAR EL DESAHUCIO, es decir, no podrán evitar el lanzamiento pagando en el último momento una vez interpuesta la demanda.', { align: 'justify' });
doc.moveDown(1);

doc.text('El presente burofax constituye requerimiento fehaciente a todos los efectos legales, quedando ustedes debidamente notificados de mi voluntad de resolver el contrato de arrendamiento por incumplimiento de la obligación de pago de la renta.', { align: 'justify' });
doc.moveDown(1);

doc.text('Sin otro particular, queda a la espera de su cumplimiento en el plazo indicado.', { align: 'justify' });
doc.moveDown(1.5);

doc.text('En Sevilla, a 20 de febrero de 2027');
doc.moveDown(2);

doc.text('Fdo.: D. Francisco Javier Martínez López');
doc.text('Arrendador y propietario');

doc.end();

stream.on('finish', () => {
  console.log('Burofax generado: /tmp/burofax_requerimiento.pdf');
});
