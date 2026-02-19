const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 65, right: 65 }
});

const stream = fs.createWriteStream('/tmp/contrato_martinez_ruiz.pdf');
doc.pipe(stream);

const FONT_REGULAR = 'Times-Roman';
const FONT_BOLD = 'Times-Bold';

function parrafo(texto, opciones = {}) {
  const indent = opciones.indent ? 25 : 0;
  doc.font(FONT_REGULAR).fontSize(10.5);
  doc.text(texto, doc.x + indent, doc.y, { 
    align: 'justify', 
    width: 465 - indent
  });
  doc.moveDown(0.4);
}

function parrafoBold(texto) {
  doc.font(FONT_BOLD).fontSize(10.5).text(texto, { align: 'justify', width: 465 });
  doc.moveDown(0.4);
}

function titulo(texto) {
  doc.font(FONT_BOLD).fontSize(13).text(texto, { align: 'center' });
  doc.moveDown(0.8);
}

function subtitulo(texto) {
  doc.font(FONT_BOLD).fontSize(10.5).text(texto, { align: 'center' });
  doc.moveDown(0.6);
}

function clausula(texto) {
  doc.font(FONT_BOLD).fontSize(10.5).text(texto);
  doc.moveDown(0.3);
}

function lista(items) {
  items.forEach(item => {
    doc.font(FONT_REGULAR).fontSize(10.5).text(item, { indent: 25, align: 'justify', width: 440 });
    doc.moveDown(0.2);
  });
  doc.moveDown(0.2);
}

// ===== CONTRATO =====

titulo('CONTRATO DE ARRENDAMIENTO DE VIVIENDA');

doc.font(FONT_REGULAR).fontSize(10.5).text('En Sevilla, a 12 de febrero de 2026', { align: 'right' });
doc.moveDown(1.2);

subtitulo('COMPARECEN');

parrafo('De una parte, como ARRENDADOR, D. FRANCISCO JAVIER MARTÍNEZ LÓPEZ, mayor de edad, nacido el 3 de abril de 1978, de nacionalidad española, con DNI núm. 28.456.913-L, estado civil casado en régimen de separación de bienes, con domicilio a efectos de notificaciones en Sevilla, teléfono 6XX XXX XXX y correo electrónico fjmartinez@email.com.', { indent: true });

parrafo('De otra parte, como ARRENDATARIA, Dña. MARÍA ELENA RUIZ GARCÍA, mayor de edad, nacida el 15 de julio de 1990, de nacionalidad española, con DNI núm. 30.987.654-T, empleada por cuenta ajena como farmacéutica en el Hospital Universitario Virgen del Rocío de Sevilla, teléfono y correo electrónico que constan en la documentación aportada.', { indent: true });

parrafo('Ambas partes se reconocen capacidad legal suficiente para el otorgamiento del presente contrato de arrendamiento de vivienda y, a tal efecto,', { indent: true });

subtitulo('EXPONEN');

parrafoBold('I. Propiedad del inmueble.');
parrafo('Que el arrendador es propietario pleno, con carácter privativo, de la siguiente finca urbana:', { indent: true });

parrafo('VIVIENDA sita en Avenida de Coria núm. 43, piso 3º, letra B, C.P. 41010, Sevilla, Barrio de Triana, en el edificio denominado Residencial "Coria Plaza", construido en el año 2008.', { indent: true });

parrafo('Referencia catastral: 1234567TG3413S0003AB', { indent: true });
parrafo('Inscrita en el Registro de la Propiedad núm. 3 de Sevilla, finca registral núm. 18.742, tomo 2.145, libro 389, folio 112.', { indent: true });

parrafo('La vivienda tiene una superficie construida de 112 m² y útil de 94 m², distribuida en: salón-comedor de 24 m², cocina independiente de 12 m² completamente equipada, dormitorio principal de 15 m² con baño en suite, dos dormitorios secundarios de 11 m² y 10 m², dos baños completos y terraza exterior de 6 m².', { indent: true });

parrafo('ANEJOS vinculados: plaza de garaje núm. 27 (12 m²) en planta sótano y trastero núm. 14 (5 m²).', { indent: true });

parrafo('El título de propiedad lo constituye escritura pública de compraventa otorgada ante el Notario de Sevilla D. Manuel Rodríguez Pardo, el día 18 de septiembre de 2015, protocolo núm. 2.187. La finca se encuentra libre de cargas, gravámenes, arrendamientos previos y afecciones fiscales pendientes.', { indent: true });

parrafoBold('II. Condición del arrendador.');
parrafo('El arrendador declara NO TENER la condición de gran tenedor conforme al artículo 3.k) de la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda. Asimismo, declara que la vivienda NO SE ENCUENTRA situada en zona de mercado residencial tensionado declarada conforme al artículo 18 de la citada Ley.', { indent: true });

parrafoBold('III. Estado de la vivienda.');
parrafo('La vivienda se encuentra en perfecto estado de conservación, recién pintada, con suelos de tarima flotante, carpintería exterior de aluminio con doble acristalamiento, aire acondicionado centralizado frío/calor y termo eléctrico de 100 litros.', { indent: true });

parrafo('Se arrienda totalmente amueblada, según inventario que se adjunta como Anexo I, incluyendo: sofá, mesa de comedor y sillas, tres camas con colchones, armarios empotrados revestidos, lavadora, frigorífico, horno, vitrocerámica, microondas, lavavajillas y televisor de 55 pulgadas.', { indent: true });

parrafo('El inmueble se encuentra al corriente en el pago del Impuesto sobre Bienes Inmuebles (IBI 2025: 486 €), cuotas de comunidad (75 € mensuales) y suministros (agua, luz y gas dados de alta).', { indent: true });

parrafoBold('IV. Certificado de eficiencia energética.');
parrafo('La vivienda dispone de Certificado de Eficiencia Energética vigente, que se entrega a la arrendataria como parte integrante del presente contrato.', { indent: true });

parrafoBold('V. Voluntad de contratar.');
parrafo('Que ambas partes, libre y voluntariamente, han convenido celebrar el presente contrato de arrendamiento de vivienda habitual, que se regirá por la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (en adelante, LAU), la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda, la Ley Orgánica 1/2025, de 2 de enero, y supletoriamente por el Código Civil, con sujeción a las siguientes', { indent: true });

subtitulo('ESTIPULACIONES');

// PRIMERA
clausula('PRIMERA. OBJETO DEL CONTRATO.');
parrafo('El arrendador cede en arrendamiento a la arrendataria, que acepta, el uso de la vivienda descrita en el Expositivo I, con sus anejos (plaza de garaje y trastero), destinada EXCLUSIVAMENTE a satisfacer la necesidad permanente de vivienda habitual de la arrendataria.', { indent: true });
parrafo('La arrendataria manifiesta que ocupará la vivienda junto con su pareja, D. Carlos Jiménez Ortega, mayor de edad, ingeniero informático de profesión. Queda expresamente prohibido el uso de la vivienda para cualquier otra finalidad distinta de la residencia habitual, en particular queda prohibido su destino a vivienda turística, de temporada, o para el ejercicio de actividades profesionales, comerciales o industriales.', { indent: true });

// SEGUNDA
clausula('SEGUNDA. DURACIÓN.');
parrafo('El plazo de duración del presente contrato se fija en UN (1) AÑO, comenzando el día 1 de marzo de 2026 y finalizando el día 28 de febrero de 2027.', { indent: true });
parrafo('Si la duración pactada fuera inferior a cinco años, el contrato se prorrogará obligatoriamente por plazos anuales hasta alcanzar una duración mínima de cinco años, salvo que la arrendataria manifieste al arrendador, con treinta días de antelación como mínimo a la fecha de terminación del contrato o de cualquiera de sus prórrogas, su voluntad de no renovarlo (art. 9.1 LAU).', { indent: true });

// TERCERA
clausula('TERCERA. RESERVA DE NECESIDAD.');
parrafo('El arrendador se reserva expresamente el derecho a recuperar la vivienda antes del transcurso de cinco años, conforme al artículo 9.3 de la LAU, para destinarla a vivienda permanente para sí mismo o para sus familiares en primer grado de consanguinidad o por adopción, o para su cónyuge en los supuestos de sentencia firme de separación, divorcio o nulidad matrimonial.', { indent: true });
parrafo('Para ejercer este derecho, el arrendador deberá comunicar a la arrendataria su necesidad de ocupar la vivienda con al menos DOS MESES de antelación a la fecha en que deba quedar libre.', { indent: true });

// CUARTA
clausula('CUARTA. PRÓRROGA.');
parrafo('Transcurrido el período de prórroga obligatoria de cinco años, si ninguna de las partes hubiere notificado a la otra, con al menos cuatro meses de antelación en el caso del arrendador y dos meses en el caso de la arrendataria, su voluntad de no renovar el contrato, este se prorrogará por plazos anuales hasta un máximo de tres años adicionales (art. 10.1 LAU).', { indent: true });
parrafo('La arrendataria RENUNCIA EXPRESAMENTE a las prórrogas extraordinarias previstas en los apartados 2 y 3 del artículo 10 de la LAU, renuncia que resulta legalmente admisible al no tener el arrendador la condición de gran tenedor.', { indent: true });

// QUINTA
clausula('QUINTA. RENTA.');
parrafo('La renta mensual se fija en MIL CIENTO CINCUENTA EUROS (1.150 €), que la arrendataria se obliga a abonar por mensualidades anticipadas, ANTES DEL DÍA 5 DE CADA MES.', { indent: true });
parrafo('El pago se realizará EXCLUSIVAMENTE mediante transferencia bancaria a la cuenta titularidad del arrendador:', { indent: true });
parrafoBold('IBAN: ES76 2100 1234 56 0200123456');
parrafo('El justificante bancario de la transferencia servirá como recibo de pago.', { indent: true });

// SEXTA
clausula('SEXTA. ACTUALIZACIÓN DE LA RENTA.');
parrafo('Durante la vigencia del contrato, la renta se actualizará anualmente en la fecha que se cumpla cada año de vigencia, aplicando la variación porcentual experimentada por el Índice de Garantía de Competitividad (IGC) publicado por el INE, o el índice que legalmente lo sustituya conforme al artículo 17.1 de la LAU en su redacción vigente en el momento de la actualización.', { indent: true });

// SÉPTIMA
clausula('SÉPTIMA. FIANZA Y GARANTÍAS ADICIONALES.');
parrafo('En este acto, la arrendataria hace entrega al arrendador de las siguientes cantidades:', { indent: true });
lista([
  'a) FIANZA LEGAL: 1.150 € (MIL CIENTO CINCUENTA EUROS), equivalente a una mensualidad de renta, conforme al artículo 36.1 de la LAU. El arrendador procederá a su depósito en el organismo competente de la Junta de Andalucía.',
  'b) GARANTÍA ADICIONAL: 2.300 € (DOS MIL TRESCIENTOS EUROS), equivalente a dos mensualidades de renta, conforme al artículo 36.5 de la LAU.'
]);
parrafoBold('Queda EXPRESAMENTE PROHIBIDO a la arrendataria dejar de satisfacer total o parcialmente cualquier mensualidad de renta, o las mensualidades finales del contrato, alegando su compensación con la fianza o la garantía adicional depositadas. El incumplimiento de esta prohibición facultará al arrendador para resolver el contrato.');

doc.addPage();

// OCTAVA
clausula('OCTAVA. GASTOS Y SUMINISTROS.');
parrafo('Serán de cuenta de la ARRENDATARIA:', { indent: true });
lista([
  '- Suministros individualizados: electricidad, gas, agua y telecomunicaciones.',
  '- Tasa municipal de recogida de basuras.'
]);
parrafo('Serán de cuenta del ARRENDADOR:', { indent: true });
lista([
  '- Impuesto sobre Bienes Inmuebles (IBI).',
  '- Cuotas ordinarias de la comunidad de propietarios.'
]);
parrafo('La arrendataria se obliga a contratar los suministros a su nombre en el plazo máximo de QUINCE DÍAS desde la firma del presente contrato, aportando justificante al arrendador.', { indent: true });

// NOVENA
clausula('NOVENA. CONSERVACIÓN DE LA VIVIENDA.');
parrafo('El arrendador realizará, sin derecho a elevar la renta, las reparaciones necesarias para conservar la vivienda en condiciones de habitabilidad, salvo cuando el deterioro sea imputable a la arrendataria (art. 21 LAU).', { indent: true });
parrafo('Las pequeñas reparaciones que exija el desgaste por el uso ordinario serán de cargo de la arrendataria. Se considerarán pequeñas reparaciones aquellas cuyo coste individual no exceda de 150 € y su importe acumulado anual no supere una mensualidad de renta.', { indent: true });
parrafo('La arrendataria deberá comunicar al arrendador, en el plazo máximo de CUARENTA Y OCHO HORAS, cualquier desperfecto o avería que requiera reparación urgente, siendo responsable de los daños que se deriven de la falta de comunicación.', { indent: true });

// DÉCIMA
clausula('DÉCIMA. OBRAS.');
parrafo('La arrendataria NO PODRÁ realizar, sin el consentimiento previo y POR ESCRITO del arrendador, obras que modifiquen la configuración de la vivienda o que provoquen una disminución en la estabilidad o seguridad de la misma, incluyendo pero no limitándose a: derribar tabiques, modificar instalaciones, cambiar suelos o revestimientos, instalar aparatos de aire acondicionado en fachada o realizar cualquier actuación que afecte a elementos comunes (art. 23 LAU).', { indent: true });

// UNDÉCIMA
clausula('UNDÉCIMA. PROHIBICIÓN ABSOLUTA DE CESIÓN Y SUBARRIENDO.');
parrafo('Queda TERMINANTEMENTE PROHIBIDA la cesión del contrato y el subarriendo total o parcial de la vivienda, en cualquier modalidad, sin excepción alguna (art. 8 LAU).', { indent: true });
parrafo('Se considerará subarriendo encubierto, y por tanto causa de resolución, el alojamiento en la vivienda de personas distintas de las indicadas en este contrato (la arrendataria y su pareja D. Carlos Jiménez Ortega) por períodos superiores a quince días, salvo autorización expresa y escrita del arrendador.', { indent: true });
parrafo('Queda igualmente prohibido el uso de la vivienda para alquiler turístico o por habitaciones, aunque sea de forma ocasional, a través de plataformas digitales o por cualquier otro medio.', { indent: true });

// DUODÉCIMA
clausula('DUODÉCIMA. EMPADRONAMIENTO.');
parrafo('La arrendataria queda autorizada para empadronarse en la vivienda arrendada, debiendo hacerlo en el plazo máximo de TREINTA DÍAS desde la firma del presente contrato.', { indent: true });
parrafo('Queda EXPRESAMENTE PROHIBIDO el empadronamiento de cualquier otra persona distinta de la arrendataria y de D. Carlos Jiménez Ortega, salvo autorización previa y por escrito del arrendador. El incumplimiento de esta prohibición será causa de resolución del contrato.', { indent: true });

// DECIMOTERCERA
clausula('DECIMOTERCERA. DESISTIMIENTO.');
parrafo('La arrendataria podrá desistir del contrato una vez hayan transcurrido al menos SEIS MESES, siempre que lo comunique al arrendador con una antelación mínima de TREINTA DÍAS (art. 11 LAU).', { indent: true });
parrafo('En caso de desistimiento, la arrendataria deberá indemnizar al arrendador con una cantidad equivalente a UNA MENSUALIDAD DE RENTA POR CADA AÑO DE CONTRATO QUE RESTE POR CUMPLIR, prorrateándose los períodos inferiores al año.', { indent: true });

// DECIMOCUARTA
clausula('DECIMOCUARTA. CAUSAS DE RESOLUCIÓN.');
parrafo('El arrendador podrá resolver de pleno derecho el contrato por las causas previstas en el artículo 27.2 de la LAU:', { indent: true });
lista([
  'a) La falta de pago de la renta o de cualquiera de las cantidades cuyo pago corresponda a la arrendataria.',
  'b) La falta de pago del importe de la fianza o su actualización.',
  'c) El subarriendo o la cesión inconsentidos.',
  'd) La realización de daños causados dolosamente o de obras no consentidas.',
  'e) La realización de actividades molestas, insalubres, nocivas, peligrosas o ilícitas.',
  'f) El destino de la vivienda a fines distintos del pactado.',
  'g) El empadronamiento de terceros no autorizados.',
  'h) El alojamiento de personas no autorizadas por períodos superiores a quince días.',
  'i) El uso de la vivienda para alquiler turístico o por habitaciones.'
]);
parrafo('Conforme al artículo 22.4 de la Ley de Enjuiciamiento Civil, no procederá la enervación del desahucio cuando el arrendador hubiese requerido de pago al arrendatario por cualquier medio fehaciente con al menos treinta días de antelación a la presentación de la demanda, y el pago no se hubiese efectuado al tiempo de dicha presentación.', { indent: true });

// DECIMOQUINTA
clausula('DECIMOQUINTA. ACTIVIDADES PROHIBIDAS.');
parrafo('Queda expresamente prohibido realizar en la vivienda:', { indent: true });
lista([
  '- Actividades molestas para los vecinos (ruidos, olores, etc.).',
  '- Actividades insalubres, nocivas o peligrosas.',
  '- Actividades ilícitas de cualquier naturaleza.',
  '- Actividades profesionales, comerciales o industriales.',
  '- Alojamiento turístico o alquiler por habitaciones.',
  '- Tenencia de animales peligrosos o exóticos sin autorización.'
]);
parrafo('El incumplimiento de estas prohibiciones será causa de resolución inmediata del contrato.', { indent: true });

doc.addPage();

// DECIMOSEXTA
clausula('DECIMOSEXTA. SOLUCIÓN DE CONTROVERSIAS (MASC).');
parrafo('Conforme a la Ley Orgánica 1/2025, de 2 de enero, de medidas en materia de eficiencia del Servicio Público de Justicia, las partes acuerdan someter cualquier controversia derivada del presente contrato a OFERTA VINCULANTE CONFIDENCIAL (OVC) como medio adecuado de solución de controversias con carácter previo a la vía judicial.', { indent: true });
parrafo('El requerimiento de la OVC deberá cursarse fehacientemente a la otra parte, que dispondrá de un plazo de TREINTA DÍAS para aceptar, rechazar o formular contrapropuesta. Transcurrido dicho plazo sin respuesta, o rechazada la oferta, quedará expedita la vía judicial.', { indent: true });

// DECIMOSÉPTIMA
clausula('DECIMOSÉPTIMA. RENUNCIA AL DERECHO DE ADQUISICIÓN PREFERENTE.');
parrafo('La arrendataria RENUNCIA EXPRESAMENTE a los derechos de tanteo y retracto que le confiere el artículo 25 de la LAU, conforme a lo dispuesto en el apartado 8 del citado precepto.', { indent: true });
parrafo('No obstante, el arrendador se obliga a comunicar a la arrendataria su intención de vender la vivienda con al menos treinta días de antelación.', { indent: true });

// DECIMOCTAVA
clausula('DECIMOCTAVA. OBLIGACIONES ADICIONALES DE LA ARRENDATARIA.');
parrafo('La arrendataria se obliga, además de lo establecido en las estipulaciones anteriores, a:', { indent: true });
lista([
  'a) Contratar y mantener vigente durante toda la duración del arrendamiento un SEGURO DE HOGAR que cubra, al menos, responsabilidad civil frente a terceros, incendio, explosión y daños por agua, con cobertura mínima de 150.000 €, aportando copia de la póliza al arrendador en el plazo de treinta días.',
  'b) Cumplir las normas de régimen interno de la comunidad de propietarios del edificio.',
  'c) Permitir el acceso a la vivienda del arrendador o persona designada por este, previo aviso con al menos 24 horas de antelación, para la realización de reparaciones urgentes o inspecciones necesarias.',
  'd) Mantener la vivienda, anejos y elementos comunes en buen estado de conservación y limpieza.',
  'e) No realizar mudanzas ni transportar objetos voluminosos por la escalera del edificio fuera del horario permitido por la comunidad.'
]);

// DECIMONOVENA
clausula('DECIMONOVENA. PENALIZACIÓN POR PERMANENCIA INDEBIDA.');
parrafo('En caso de que la arrendataria no desalojare la vivienda a la terminación del contrato o de cualquiera de sus prórrogas, o tras la resolución por cualquier causa, vendrá obligada a abonar al arrendador una cantidad equivalente al 150% DE LA RENTA DIARIA (57,50 € x 1,5 = 86,25 €/día) por cada día de retraso en la entrega de las llaves, sin perjuicio de las acciones judiciales que correspondan y de la indemnización de los daños y perjuicios que se acrediten.', { indent: true });

// VIGÉSIMA
clausula('VIGÉSIMA. DEVOLUCIÓN DE LA VIVIENDA.');
parrafo('A la terminación del contrato por cualquier causa, la arrendataria deberá devolver la vivienda en el mismo estado en que la recibió, salvo el desgaste normal por el uso ordinario, con todos los muebles, enseres y electrodomésticos relacionados en el Anexo I, y las llaves entregadas.', { indent: true });
parrafo('Se levantará acta de devolución con indicación del estado de la vivienda y lecturas de contadores. Los desperfectos que excedan del uso normal serán deducidos de la fianza y garantía adicional, sin perjuicio de reclamar el exceso.', { indent: true });

// VIGESIMOPRIMERA
clausula('VIGESIMOPRIMERA. PROTECCIÓN DE DATOS.');
parrafo('Ambas partes se informan mutuamente de que los datos personales recogidos en el presente contrato serán tratados con la finalidad de gestionar la relación arrendaticia, conforme al Reglamento (UE) 2016/679 y la Ley Orgánica 3/2018. Los datos se conservarán durante la vigencia del contrato y el tiempo necesario para atender posibles responsabilidades. Cada parte podrá ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición comunicándolo a la otra parte.', { indent: true });

// VIGESIMOSEGUNDA
clausula('VIGESIMOSEGUNDA. JURISDICCIÓN Y COMPETENCIA.');
parrafo('Para cuantas cuestiones litigiosas pudieran derivarse del presente contrato, las partes, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, SE SOMETEN A LA JURISDICCIÓN DE LOS TRIBUNALES DE INSTANCIA DE SEVILLA.', { indent: true });

// CIERRE
doc.moveDown(0.8);
parrafo('Y en prueba de conformidad con cuanto antecede, las partes firman el presente contrato por duplicado y a un solo efecto, en el lugar y fecha indicados en el encabezamiento, manifestando haber recibido cada una un ejemplar.', { indent: true });

doc.moveDown(1.5);
doc.font(FONT_BOLD).fontSize(10.5);
doc.text('EL ARRENDADOR', 85, doc.y);
doc.text('LA ARRENDATARIA', 350, doc.y - 14);
doc.moveDown(3);
doc.font(FONT_REGULAR).fontSize(10.5);
doc.text('Fdo.: Francisco Javier Martínez López', 50, doc.y);
doc.text('Fdo.: María Elena Ruiz García', 310, doc.y - 14);

// ANEXO I
doc.addPage();
titulo('ANEXO I – INVENTARIO');

parrafo('Relación de muebles, enseres y electrodomésticos que se encuentran en la vivienda sita en Avda. de Coria nº 43, 3º B, Sevilla, en el momento de su entrega:');

doc.moveDown(0.5);
doc.font(FONT_BOLD).fontSize(10.5).text('SALÓN-COMEDOR:');
lista([
  '- Sofá de tres plazas tapizado en tela gris.',
  '- Mesa de comedor extensible con 6 sillas.',
  '- Mueble de televisión.',
  '- Televisor Samsung 55 pulgadas Smart TV.',
  '- Mesa de centro de cristal.',
  '- Lámpara de pie.'
]);

doc.font(FONT_BOLD).fontSize(10.5).text('COCINA:');
lista([
  '- Frigorífico combinado Bosch No Frost.',
  '- Horno eléctrico Balay.',
  '- Vitrocerámica de inducción.',
  '- Microondas Samsung.',
  '- Lavavajillas Siemens.',
  '- Lavadora Bosch 8 kg.',
  '- Campana extractora.',
  '- Muebles de cocina altos y bajos completos.',
  '- Menaje básico (vajilla, cubertería, ollas, sartenes).'
]);

doc.font(FONT_BOLD).fontSize(10.5).text('DORMITORIO PRINCIPAL:');
lista([
  '- Cama de matrimonio 150x190 con colchón.',
  '- Dos mesillas de noche.',
  '- Armario empotrado de 4 puertas correderas.',
  '- Cómoda con espejo.'
]);

doc.font(FONT_BOLD).fontSize(10.5).text('DORMITORIO SECUNDARIO 1:');
lista([
  '- Cama individual 90x190 con colchón.',
  '- Mesilla de noche.',
  '- Armario empotrado de 2 puertas.',
  '- Escritorio con silla.'
]);

doc.font(FONT_BOLD).fontSize(10.5).text('DORMITORIO SECUNDARIO 2:');
lista([
  '- Cama individual 90x190 con colchón.',
  '- Mesilla de noche.',
  '- Armario empotrado de 2 puertas.'
]);

doc.font(FONT_BOLD).fontSize(10.5).text('BAÑOS:');
lista([
  '- Baño principal: plato de ducha, inodoro, bidé, lavabo con mueble, espejo.',
  '- Baño en suite: plato de ducha, inodoro, lavabo con mueble, espejo.',
  '- Accesorios (toalleros, portarrollos, perchas).'
]);

doc.font(FONT_BOLD).fontSize(10.5).text('OTROS:');
lista([
  '- Termo eléctrico 100 litros.',
  '- Aire acondicionado centralizado (unidades en salón y dormitorios).',
  '- 4 juegos de llaves completos (portal, vivienda, buzón, garaje, trastero).',
  '- 2 mandos de garaje.',
  '- Mando del aire acondicionado.'
]);

doc.moveDown(0.5);
parrafo('Estado general de la vivienda: EXCELENTE. Recién pintada, limpia y en perfecto estado de funcionamiento todos los electrodomésticos e instalaciones.');
parrafo('Observaciones: Ninguna.');

doc.moveDown(1);
doc.font(FONT_REGULAR).fontSize(10.5).text('Conforme con el inventario,');
doc.moveDown(1.5);
doc.font(FONT_BOLD).fontSize(10.5);
doc.text('EL ARRENDADOR', 85, doc.y);
doc.text('LA ARRENDATARIA', 350, doc.y - 14);

// ANEXO II
doc.addPage();
titulo('ANEXO II – ACTA DE ENTREGA DE LLAVES');

parrafo('En Sevilla, a 1 de marzo de 2026, D. Francisco Javier Martínez López, en su condición de arrendador, hace entrega a Dña. María Elena Ruiz García, en su condición de arrendataria, de las llaves de la vivienda sita en Avda. de Coria nº 43, 3º B, 41010 Sevilla.', { indent: true });

doc.moveDown(0.5);
doc.font(FONT_BOLD).fontSize(10.5).text('LLAVES ENTREGADAS:');
lista([
  '- 4 juegos de llaves del portal.',
  '- 4 juegos de llaves de la vivienda.',
  '- 4 llaves de buzón.',
  '- 2 llaves de trastero.',
  '- 2 mandos de garaje.'
]);

doc.font(FONT_BOLD).fontSize(10.5).text('LECTURAS DE CONTADORES:');
lista([
  '- Electricidad: __________ kWh',
  '- Gas: __________ m³',
  '- Agua: __________ m³'
]);

parrafo('La arrendataria declara recibir la vivienda en perfecto estado de conservación y limpieza, apta para el uso al que se destina, conforme al inventario que figura como Anexo I del contrato de arrendamiento.', { indent: true });

parrafo('Y para que así conste, firman la presente acta por duplicado.', { indent: true });

doc.moveDown(1.5);
doc.font(FONT_BOLD).fontSize(10.5);
doc.text('EL ARRENDADOR', 85, doc.y);
doc.text('LA ARRENDATARIA', 350, doc.y - 14);
doc.moveDown(3);
doc.font(FONT_REGULAR).fontSize(10.5);
doc.text('Fdo.: Francisco Javier Martínez López', 50, doc.y);
doc.text('Fdo.: María Elena Ruiz García', 310, doc.y - 14);

doc.end();

stream.on('finish', () => {
  console.log('PDF generado: /tmp/contrato_martinez_ruiz.pdf');
});
