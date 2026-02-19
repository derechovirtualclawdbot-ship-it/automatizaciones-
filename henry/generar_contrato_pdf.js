const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 70, bottom: 70, left: 70, right: 70 }
});

const stream = fs.createWriteStream('/tmp/contrato_arrendamiento.pdf');
doc.pipe(stream);

// Configuración de fuentes
const FONT_REGULAR = 'Times-Roman';
const FONT_BOLD = 'Times-Bold';

// Helper para texto justificado con sangría
function parrafo(texto, opciones = {}) {
  const indent = opciones.indent ? 30 : 0;
  doc.font(FONT_REGULAR).fontSize(11);
  doc.text(texto, doc.x + indent, doc.y, { 
    align: 'justify', 
    width: 455 - indent,
    continued: false
  });
  doc.moveDown(0.5);
}

function parrafoConNegrita(partes) {
  partes.forEach((parte, i) => {
    if (parte.bold) {
      doc.font(FONT_BOLD);
    } else {
      doc.font(FONT_REGULAR);
    }
    doc.fontSize(11).text(parte.text, { continued: i < partes.length - 1, align: 'justify' });
  });
  doc.moveDown(0.5);
}

function titulo(texto) {
  doc.font(FONT_BOLD).fontSize(14).text(texto, { align: 'center' });
  doc.moveDown(1);
}

function subtitulo(texto) {
  doc.font(FONT_BOLD).fontSize(11).text(texto, { align: 'center' });
  doc.moveDown(0.8);
}

function clausula(texto) {
  doc.font(FONT_BOLD).fontSize(11).text(texto, { align: 'left' });
  doc.moveDown(0.3);
}

function lista(items) {
  items.forEach(item => {
    doc.font(FONT_REGULAR).fontSize(11).text(item, { indent: 30, align: 'justify' });
    doc.moveDown(0.3);
  });
  doc.moveDown(0.3);
}

// ===== CONTENIDO DEL CONTRATO =====

// TÍTULO
titulo('CONTRATO DE ARRENDAMIENTO DE VIVIENDA');

// Lugar y fecha
doc.font(FONT_REGULAR).fontSize(11).text('En [LOCALIDAD], a [DÍA] de [MES] de [AÑO]', { align: 'right' });
doc.moveDown(1.5);

// COMPARECEN
subtitulo('COMPARECEN');

parrafoConNegrita([
  { text: 'De una parte, como ', bold: false },
  { text: 'ARRENDADOR', bold: true },
  { text: ', D./Dña. [NOMBRE COMPLETO ARRENDADOR], mayor de edad, con DNI/NIE núm. [DNI ARRENDADOR], y domicilio a efectos de notificaciones en [DOMICILIO ARRENDADOR], correo electrónico [EMAIL ARRENDADOR] y teléfono [TELÉFONO ARRENDADOR].', bold: false }
]);

parrafoConNegrita([
  { text: 'De otra parte, como ', bold: false },
  { text: 'ARRENDATARIO', bold: true },
  { text: ', D./Dña. [NOMBRE COMPLETO ARRENDATARIO], mayor de edad, con DNI/NIE núm. [DNI ARRENDATARIO], y domicilio actual en [DOMICILIO ACTUAL ARRENDATARIO], correo electrónico [EMAIL ARRENDATARIO] y teléfono [TELÉFONO ARRENDATARIO].', bold: false }
]);

parrafo('Ambas partes se reconocen capacidad legal suficiente para el otorgamiento del presente contrato de arrendamiento de vivienda y, a tal efecto,');

// EXPONEN
subtitulo('EXPONEN');

parrafoConNegrita([
  { text: 'I. ', bold: true },
  { text: 'Que el arrendador es propietario de la vivienda sita en [DIRECCIÓN COMPLETA DE LA VIVIENDA], con referencia catastral [REFERENCIA CATASTRAL], inscrita en el Registro de la Propiedad de [LOCALIDAD], al tomo [TOMO], libro [LIBRO], folio [FOLIO], finca núm. [NÚMERO FINCA].', bold: false }
]);

parrafoConNegrita([
  { text: 'II. ', bold: true },
  { text: 'Que el arrendador declara ', bold: false },
  { text: '[NO TENER / TENER]', bold: true },
  { text: ' la condición de gran tenedor conforme al artículo 3.k) de la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda. Asimismo, declara que la vivienda ', bold: false },
  { text: '[NO SE ENCUENTRA / SE ENCUENTRA]', bold: true },
  { text: ' situada en zona de mercado residencial tensionado.', bold: false }
]);

parrafoConNegrita([
  { text: 'III. ', bold: true },
  { text: 'Que la vivienda dispone de Certificado de Eficiencia Energética con calificación [LETRA EFICIENCIA] y número de registro [NÚMERO REGISTRO CEE], que se adjunta como parte integrante del presente contrato.', bold: false }
]);

parrafoConNegrita([
  { text: 'IV. ', bold: true },
  { text: 'Que ambas partes, libre y voluntariamente, han convenido celebrar el presente contrato de arrendamiento de vivienda, que se regirá por la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos, la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda, y supletoriamente por el Código Civil, con sujeción a las siguientes', bold: false }
]);

// ESTIPULACIONES
subtitulo('ESTIPULACIONES');

// PRIMERA
clausula('PRIMERA. OBJETO DEL CONTRATO.');
parrafo('El arrendador cede en arrendamiento al arrendatario, que acepta, el uso de la vivienda descrita en el Expositivo I, destinada exclusivamente a satisfacer la necesidad permanente de vivienda del arrendatario y, en su caso, de las personas que con él convivan habitualmente.', { indent: true });
parrafo('La vivienda se arrienda amueblada/sin amueblar, con los muebles, enseres y electrodomésticos que figuran en el inventario que se adjunta como Anexo I.', { indent: true });

// SEGUNDA
clausula('SEGUNDA. DURACIÓN.');
parrafoConNegrita([
  { text: 'El plazo de duración del presente contrato se fija en ', bold: false },
  { text: '[NÚMERO] año(s)', bold: true },
  { text: ', comenzando el día ', bold: false },
  { text: '[FECHA INICIO]', bold: true },
  { text: ' y finalizando el día ', bold: false },
  { text: '[FECHA FIN]', bold: true },
  { text: '.', bold: false }
]);
parrafo('Si la duración pactada fuera inferior a cinco años, el contrato se prorrogará obligatoriamente por plazos anuales hasta alcanzar una duración mínima de cinco años, salvo que el arrendatario manifieste al arrendador, con treinta días de antelación como mínimo a la fecha de terminación del contrato o de cualquiera de sus prórrogas, su voluntad de no renovarlo (art. 9.1 LAU).', { indent: true });

// TERCERA
clausula('TERCERA. RESERVA DE NECESIDAD.');
parrafo('El arrendador se reserva expresamente el derecho a recuperar la vivienda antes del transcurso de cinco años, conforme al artículo 9.3 de la LAU, para destinarla a vivienda permanente para sí mismo o para sus familiares en primer grado de consanguinidad o por adopción, o para su cónyuge en los supuestos de sentencia firme de separación, divorcio o nulidad matrimonial.', { indent: true });
parrafoConNegrita([
  { text: 'Para ejercer este derecho, el arrendador deberá comunicar al arrendatario su necesidad de ocupar la vivienda con al menos ', bold: false },
  { text: 'dos meses de antelación', bold: true },
  { text: ' a la fecha en que deba quedar libre.', bold: false }
]);

// CUARTA
clausula('CUARTA. PRÓRROGA.');
parrafo('Transcurrido el período de prórroga obligatoria (cinco años), si ninguna de las partes hubiere notificado a la otra, con al menos cuatro meses de antelación en el caso del arrendador y dos meses en el caso del arrendatario, su voluntad de no renovar el contrato, este se prorrogará por plazos anuales hasta un máximo de tres años adicionales, salvo que el arrendatario manifieste su voluntad de no renovarlo con un mes de antelación (art. 10.1 LAU).', { indent: true });
parrafo('El arrendatario renuncia expresamente a las prórrogas extraordinarias previstas en los apartados 2 y 3 del artículo 10 de la LAU, en la medida en que esta renuncia resulte legalmente admisible conforme a la condición del arrendador.', { indent: true });

// QUINTA
clausula('QUINTA. RENTA.');
parrafoConNegrita([
  { text: 'La renta mensual se fija en ', bold: false },
  { text: '[IMPORTE EN NÚMERO] euros ([IMPORTE EN LETRA] euros)', bold: true },
  { text: ', que el arrendatario se obliga a abonar por mensualidades anticipadas, dentro de los ', bold: false },
  { text: 'siete primeros días de cada mes', bold: true },
  { text: '.', bold: false }
]);
parrafoConNegrita([
  { text: 'El pago se realizará mediante transferencia bancaria a la cuenta titularidad del arrendador: ', bold: false },
  { text: 'IBAN [NÚMERO DE CUENTA]', bold: true },
  { text: '.', bold: false }
]);

// SEXTA
clausula('SEXTA. ACTUALIZACIÓN DE LA RENTA.');
parrafo('Durante la vigencia del contrato, la renta solo podrá actualizarse anualmente en la fecha que se cumpla cada año de vigencia del contrato, aplicando la variación porcentual experimentada por el Índice de Garantía de Competitividad (IGC) o el índice que legalmente lo sustituya, conforme al artículo 17.1 de la LAU.', { indent: true });

// SÉPTIMA
clausula('SÉPTIMA. FIANZA Y GARANTÍAS ADICIONALES.');
parrafo('En este acto, el arrendatario hace entrega al arrendador de las siguientes cantidades:', { indent: true });
lista([
  'a) Fianza legal: [IMPORTE] euros, equivalente a una mensualidad de renta, conforme al artículo 36.1 de la LAU.',
  'b) Garantía adicional: [IMPORTE] euros, equivalente a dos mensualidades de renta, conforme al artículo 36.5 de la LAU.'
]);
parrafoConNegrita([
  { text: 'Queda expresamente prohibido al arrendatario dejar de satisfacer total o parcialmente cualquier mensualidad de renta alegando su compensación con la fianza o la garantía adicional depositadas.', bold: true }
]);

// OCTAVA
clausula('OCTAVA. GASTOS Y SUMINISTROS.');
parrafoConNegrita([
  { text: 'Serán de cuenta del arrendatario los gastos por servicios y suministros individualizados con que cuente la vivienda (electricidad, gas, agua, telecomunicaciones y similares). El arrendatario se obliga a contratar los suministros a su nombre en el plazo máximo de ', bold: false },
  { text: 'quince días', bold: true },
  { text: ' desde la firma del presente contrato.', bold: false }
]);
parrafo('Los gastos generales para el sostenimiento del inmueble, sus servicios, tributos, cargas y responsabilidades que correspondan a la vivienda arrendada serán de cuenta del arrendador, sin perjuicio de lo dispuesto en el artículo 20 de la LAU para los gastos de comunidad e IBI.', { indent: true });

// NOVENA
clausula('NOVENA. CONSERVACIÓN DE LA VIVIENDA.');
parrafo('El arrendador realizará, sin derecho a elevar la renta, las reparaciones necesarias para conservar la vivienda en condiciones de habitabilidad, salvo cuando el deterioro sea imputable al arrendatario (art. 21 LAU).', { indent: true });
parrafoConNegrita([
  { text: 'Las pequeñas reparaciones que exija el desgaste por el uso ordinario de la vivienda serán de cargo del arrendatario. A estos efectos, se considerarán pequeñas reparaciones aquellas cuyo coste individual no exceda de ', bold: false },
  { text: '150 euros', bold: true },
  { text: ' y su importe acumulado anual no supere el equivalente a una mensualidad de renta.', bold: false }
]);
parrafoConNegrita([
  { text: 'El arrendatario deberá comunicar al arrendador, en el plazo máximo de ', bold: false },
  { text: 'cuarenta y ocho horas', bold: true },
  { text: ', cualquier desperfecto o avería que requiera reparación urgente.', bold: false }
]);

// DÉCIMA
clausula('DÉCIMA. OBRAS.');
parrafo('El arrendatario no podrá realizar sin el consentimiento previo y por escrito del arrendador obras que modifiquen la configuración de la vivienda o que provoquen una disminución en la estabilidad o seguridad de la misma (art. 23 LAU).', { indent: true });

// UNDÉCIMA
clausula('UNDÉCIMA. CESIÓN Y SUBARRIENDO.');
parrafo('Queda prohibida la cesión del contrato y el subarriendo total o parcial de la vivienda sin el consentimiento previo y por escrito del arrendador (art. 8 LAU).', { indent: true });

// DUODÉCIMA
clausula('DUODÉCIMA. DESISTIMIENTO.');
parrafo('El arrendatario podrá desistir del contrato una vez hayan transcurrido al menos seis meses, siempre que lo comunique al arrendador con una antelación mínima de treinta días (art. 11 LAU).', { indent: true });
parrafoConNegrita([
  { text: 'En caso de desistimiento, el arrendatario deberá indemnizar al arrendador con una cantidad equivalente a ', bold: false },
  { text: 'una mensualidad de renta por cada año de contrato que reste por cumplir', bold: true },
  { text: ', prorrateándose los períodos inferiores al año.', bold: false }
]);

// Nueva página
doc.addPage();

// DECIMOTERCERA
clausula('DECIMOTERCERA. CAUSAS DE RESOLUCIÓN.');
parrafo('El arrendador podrá resolver de pleno derecho el contrato por las causas previstas en el artículo 27.2 de la LAU, en particular:', { indent: true });
lista([
  'a) La falta de pago de la renta o de cualquiera de las cantidades cuyo pago corresponda al arrendatario.',
  'b) La falta de pago del importe de la fianza o su actualización.',
  'c) El subarriendo o la cesión inconsentidos.',
  'd) La realización de daños causados dolosamente o de obras no consentidas.',
  'e) La realización de actividades molestas, insalubres, nocivas, peligrosas o ilícitas.',
  'f) El destino de la vivienda a fines distintos del pactado.'
]);

// DECIMOCUARTA
clausula('DECIMOCUARTA. SOLUCIÓN DE CONTROVERSIAS (MASC).');
parrafoConNegrita([
  { text: 'Conforme a la Ley Orgánica 1/2025, de 2 de enero, de medidas en materia de eficiencia del Servicio Público de Justicia, las partes acuerdan someter cualquier controversia derivada del presente contrato a ', bold: false },
  { text: 'Oferta Vinculante Confidencial (OVC)', bold: true },
  { text: ' como medio adecuado de solución de controversias con carácter previo a la vía judicial.', bold: false }
]);
parrafo('El requerimiento de la OVC deberá cursarse fehacientemente a la otra parte, que dispondrá de un plazo de treinta días para aceptar, rechazar o formular contrapropuesta. Transcurrido dicho plazo sin respuesta, o rechazada la oferta, quedará expedita la vía judicial.', { indent: true });

// DECIMOQUINTA
clausula('DECIMOQUINTA. RENUNCIA AL DERECHO DE ADQUISICIÓN PREFERENTE.');
parrafo('El arrendatario renuncia expresamente a los derechos de tanteo y retracto que le confiere el artículo 25 de la LAU, conforme a lo dispuesto en el apartado 8 del citado precepto.', { indent: true });
parrafo('No obstante, el arrendador se obliga a comunicar al arrendatario su intención de vender la vivienda con al menos treinta días de antelación.', { indent: true });

// DECIMOSEXTA
clausula('DECIMOSEXTA. OBLIGACIONES ADICIONALES DEL ARRENDATARIO.');
parrafo('El arrendatario se obliga, además de lo establecido en las estipulaciones anteriores, a:', { indent: true });
lista([
  'a) Empadronarse en la vivienda arrendada en el plazo máximo de treinta días desde la firma del presente contrato.',
  'b) Contratar y mantener vigente durante toda la duración del arrendamiento un seguro de hogar que cubra, al menos, los riesgos de responsabilidad civil, incendio y daños por agua.',
  'c) Cumplir las normas de régimen interno de la comunidad de propietarios.',
  'd) Permitir el acceso a la vivienda del arrendador o persona designada por este, previo aviso con al menos 24 horas de antelación, para la realización de reparaciones o inspecciones necesarias.'
]);

// DECIMOSÉPTIMA
clausula('DECIMOSÉPTIMA. PENALIZACIÓN POR PERMANENCIA INDEBIDA.');
parrafoConNegrita([
  { text: 'En caso de que el arrendatario no desalojare la vivienda a la terminación del contrato o de cualquiera de sus prórrogas, vendrá obligado a abonar al arrendador una cantidad equivalente al ', bold: false },
  { text: '150% de la renta diaria', bold: true },
  { text: ' por cada día de retraso en la entrega de las llaves, sin perjuicio de las acciones judiciales que correspondan.', bold: false }
]);

// DECIMOCTAVA
clausula('DECIMOCTAVA. JURISDICCIÓN Y COMPETENCIA.');
parrafo('Para cuantas cuestiones litigiosas pudieran derivarse del presente contrato, las partes se someten a la jurisdicción de los Tribunales de Instancia del lugar donde radique la vivienda arrendada.', { indent: true });

// CIERRE
doc.moveDown(1);
parrafo('Y en prueba de conformidad con cuanto antecede, las partes firman el presente contrato por duplicado y a un solo efecto, en el lugar y fecha indicados en el encabezamiento.', { indent: true });

doc.moveDown(2);
doc.font(FONT_BOLD).fontSize(11).text('EL ARRENDADOR', 100, doc.y);
doc.font(FONT_BOLD).fontSize(11).text('EL ARRENDATARIO', 350, doc.y - 14);
doc.moveDown(3);
doc.font(FONT_REGULAR).fontSize(11).text('Fdo.: _______________________', 70, doc.y);
doc.font(FONT_REGULAR).fontSize(11).text('Fdo.: _______________________', 320, doc.y - 14);

// ANEXO I - Nueva página
doc.addPage();
titulo('ANEXO I – INVENTARIO');

parrafo('Relación de muebles, enseres y electrodomésticos que se encuentran en la vivienda en el momento de la entrega:');

doc.moveDown(0.5);
doc.font(FONT_BOLD).fontSize(11).text('SALÓN/COMEDOR:');
parrafo('[Describir mobiliario]', { indent: true });

doc.font(FONT_BOLD).fontSize(11).text('COCINA:');
parrafo('[Describir electrodomésticos y mobiliario]', { indent: true });

doc.font(FONT_BOLD).fontSize(11).text('DORMITORIO PRINCIPAL:');
parrafo('[Describir mobiliario]', { indent: true });

doc.font(FONT_BOLD).fontSize(11).text('DORMITORIO SECUNDARIO:');
parrafo('[Describir mobiliario]', { indent: true });

doc.font(FONT_BOLD).fontSize(11).text('BAÑO:');
parrafo('[Describir equipamiento]', { indent: true });

doc.font(FONT_BOLD).fontSize(11).text('OTROS:');
parrafo('[Llaves, mandos, otros elementos]', { indent: true });

doc.moveDown(1);
parrafoConNegrita([
  { text: 'Estado general de la vivienda: ', bold: false },
  { text: '[BUENO/NORMAL/CON OBSERVACIONES]', bold: true }
]);
parrafo('Observaciones: [Indicar desperfectos o situaciones especiales preexistentes]');

doc.moveDown(1.5);
doc.font(FONT_REGULAR).fontSize(11).text('Conforme,');
doc.moveDown(1.5);
doc.font(FONT_BOLD).fontSize(11).text('EL ARRENDADOR', 100, doc.y);
doc.font(FONT_BOLD).fontSize(11).text('EL ARRENDATARIO', 350, doc.y - 14);

// ANEXO II - Nueva página
doc.addPage();
titulo('ANEXO II – ACTA DE ENTREGA DE LLAVES');

parrafo('En [LOCALIDAD], a [DÍA] de [MES] de [AÑO], D./Dña. [NOMBRE ARRENDADOR], en su condición de arrendador, hace entrega a D./Dña. [NOMBRE ARRENDATARIO], en su condición de arrendatario, de las llaves de la vivienda sita en [DIRECCIÓN COMPLETA].', { indent: true });

doc.moveDown(0.5);
doc.font(FONT_BOLD).fontSize(11).text('Llaves entregadas:');
lista([
  '- [X] juego(s) de llaves del portal',
  '- [X] juego(s) de llaves de la vivienda',
  '- [X] mando(s) de garaje',
  '- [X] llave(s) de buzón',
  '- [Otros: especificar]'
]);

doc.font(FONT_BOLD).fontSize(11).text('Lecturas de contadores:');
lista([
  '- Electricidad: [LECTURA] kWh',
  '- Gas: [LECTURA] m³',
  '- Agua: [LECTURA] m³'
]);

parrafo('El arrendatario declara recibir la vivienda en perfecto estado de conservación y limpieza, apta para el uso al que se destina, conforme al inventario que figura como Anexo I del contrato de arrendamiento.', { indent: true });

parrafo('Y para que así conste, firman la presente acta por duplicado.', { indent: true });

doc.moveDown(1.5);
doc.font(FONT_BOLD).fontSize(11).text('EL ARRENDADOR', 100, doc.y);
doc.font(FONT_BOLD).fontSize(11).text('EL ARRENDATARIO', 350, doc.y - 14);
doc.moveDown(3);
doc.font(FONT_REGULAR).fontSize(11).text('Fdo.: _______________________', 70, doc.y);
doc.font(FONT_REGULAR).fontSize(11).text('Fdo.: _______________________', 320, doc.y - 14);

// Finalizar
doc.end();

stream.on('finish', () => {
  console.log('PDF generado: /tmp/contrato_arrendamiento.pdf');
});
