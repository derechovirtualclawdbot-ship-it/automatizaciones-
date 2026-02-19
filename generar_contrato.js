const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak, HeadingLevel } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Times New Roman", size: 24 }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1418, right: 1134, bottom: 1134, left: 1418 }
      }
    },
    children: [
      // TÍTULO
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "CONTRATO DE ARRENDAMIENTO DE VIVIENDA", bold: true, size: 28 })
        ]
      }),
      
      // LUGAR Y FECHA
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "En [LOCALIDAD], a [DÍA] de [MES] de [AÑO]", size: 24 })
        ]
      }),
      
      // COMPARECEN
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "COMPARECEN", bold: true, size: 24 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "De una parte, como ", size: 24 }),
          new TextRun({ text: "ARRENDADOR", bold: true, size: 24 }),
          new TextRun({ text: ", D./Dña. [NOMBRE COMPLETO ARRENDADOR], mayor de edad, con DNI/NIE núm. [DNI ARRENDADOR], y domicilio a efectos de notificaciones en [DOMICILIO ARRENDADOR], correo electrónico [EMAIL ARRENDADOR] y teléfono [TELÉFONO ARRENDADOR].", size: 24 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "De otra parte, como ", size: 24 }),
          new TextRun({ text: "ARRENDATARIO", bold: true, size: 24 }),
          new TextRun({ text: ", D./Dña. [NOMBRE COMPLETO ARRENDATARIO], mayor de edad, con DNI/NIE núm. [DNI ARRENDATARIO], y domicilio actual en [DOMICILIO ACTUAL ARRENDATARIO], correo electrónico [EMAIL ARRENDATARIO] y teléfono [TELÉFONO ARRENDATARIO].", size: 24 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Ambas partes se reconocen capacidad legal suficiente para el otorgamiento del presente contrato de arrendamiento de vivienda y, a tal efecto,", size: 24 })
        ]
      }),
      
      // EXPONEN
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "EXPONEN", bold: true, size: 24 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "I. ", bold: true, size: 24 }),
          new TextRun({ text: "Que el arrendador es propietario de la vivienda sita en [DIRECCIÓN COMPLETA DE LA VIVIENDA], con referencia catastral [REFERENCIA CATASTRAL], inscrita en el Registro de la Propiedad de [LOCALIDAD], al tomo [TOMO], libro [LIBRO], folio [FOLIO], finca núm. [NÚMERO FINCA].", size: 24 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "II. ", bold: true, size: 24 }),
          new TextRun({ text: "Que el arrendador declara ", size: 24 }),
          new TextRun({ text: "[NO TENER / TENER]", bold: true, size: 24 }),
          new TextRun({ text: " la condición de gran tenedor conforme al artículo 3.k) de la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda. Asimismo, declara que la vivienda ", size: 24 }),
          new TextRun({ text: "[NO SE ENCUENTRA / SE ENCUENTRA]", bold: true, size: 24 }),
          new TextRun({ text: " situada en zona de mercado residencial tensionado.", size: 24 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "III. ", bold: true, size: 24 }),
          new TextRun({ text: "Que la vivienda dispone de Certificado de Eficiencia Energética con calificación [LETRA EFICIENCIA] y número de registro [NÚMERO REGISTRO CEE], que se adjunta como parte integrante del presente contrato.", size: 24 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "IV. ", bold: true, size: 24 }),
          new TextRun({ text: "Que ambas partes, libre y voluntariamente, han convenido celebrar el presente contrato de arrendamiento de vivienda, que se regirá por la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos, la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda, y supletoriamente por el Código Civil, con sujeción a las siguientes", size: 24 })
        ]
      }),
      
      // ESTIPULACIONES
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "ESTIPULACIONES", bold: true, size: 24 })
        ]
      }),
      
      // PRIMERA - OBJETO
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "PRIMERA. OBJETO DEL CONTRATO.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendador cede en arrendamiento al arrendatario, que acepta, el uso de la vivienda descrita en el Expositivo I, destinada exclusivamente a satisfacer la necesidad permanente de vivienda del arrendatario y, en su caso, de las personas que con él convivan habitualmente.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La vivienda se arrienda amueblada/sin amueblar, con los muebles, enseres y electrodomésticos que figuran en el inventario que se adjunta como Anexo I.", size: 24 })
        ]
      }),
      
      // SEGUNDA - DURACIÓN
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "SEGUNDA. DURACIÓN.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El plazo de duración del presente contrato se fija en ", size: 24 }),
          new TextRun({ text: "[NÚMERO] año(s)", bold: true, size: 24 }),
          new TextRun({ text: ", comenzando el día ", size: 24 }),
          new TextRun({ text: "[FECHA INICIO]", bold: true, size: 24 }),
          new TextRun({ text: " y finalizando el día ", size: 24 }),
          new TextRun({ text: "[FECHA FIN]", bold: true, size: 24 }),
          new TextRun({ text: ".", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Si la duración pactada fuera inferior a cinco años, el contrato se prorrogará obligatoriamente por plazos anuales hasta alcanzar una duración mínima de cinco años, salvo que el arrendatario manifieste al arrendador, con treinta días de antelación como mínimo a la fecha de terminación del contrato o de cualquiera de sus prórrogas, su voluntad de no renovarlo (art. 9.1 LAU).", size: 24 })
        ]
      }),
      
      // TERCERA - RESERVA NECESIDAD
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "TERCERA. RESERVA DE NECESIDAD.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendador se reserva expresamente el derecho a recuperar la vivienda antes del transcurso de cinco años, conforme al artículo 9.3 de la LAU, para destinarla a vivienda permanente para sí mismo o para sus familiares en primer grado de consanguinidad o por adopción, o para su cónyuge en los supuestos de sentencia firme de separación, divorcio o nulidad matrimonial.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Para ejercer este derecho, el arrendador deberá comunicar al arrendatario su necesidad de ocupar la vivienda con al menos ", size: 24 }),
          new TextRun({ text: "dos meses de antelación", bold: true, size: 24 }),
          new TextRun({ text: " a la fecha en que deba quedar libre.", size: 24 })
        ]
      }),
      
      // CUARTA - PRÓRROGA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "CUARTA. PRÓRROGA.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Transcurrido el período de prórroga obligatoria (cinco años), si ninguna de las partes hubiere notificado a la otra, con al menos cuatro meses de antelación en el caso del arrendador y dos meses en el caso del arrendatario, su voluntad de no renovar el contrato, este se prorrogará por plazos anuales hasta un máximo de tres años adicionales, salvo que el arrendatario manifieste su voluntad de no renovarlo con un mes de antelación (art. 10.1 LAU).", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendatario renuncia expresamente a las prórrogas extraordinarias previstas en los apartados 2 y 3 del artículo 10 de la LAU, en la medida en que esta renuncia resulte legalmente admisible conforme a la condición del arrendador.", size: 24 })
        ]
      }),
      
      // QUINTA - RENTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "QUINTA. RENTA.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La renta mensual se fija en ", size: 24 }),
          new TextRun({ text: "[IMPORTE EN NÚMERO] euros ([IMPORTE EN LETRA] euros)", bold: true, size: 24 }),
          new TextRun({ text: ", que el arrendatario se obliga a abonar por mensualidades anticipadas, dentro de los ", size: 24 }),
          new TextRun({ text: "siete primeros días de cada mes", bold: true, size: 24 }),
          new TextRun({ text: ".", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El pago se realizará mediante transferencia bancaria a la cuenta titularidad del arrendador: ", size: 24 }),
          new TextRun({ text: "IBAN [NÚMERO DE CUENTA]", bold: true, size: 24 }),
          new TextRun({ text: ".", size: 24 })
        ]
      }),
      
      // SEXTA - ACTUALIZACIÓN RENTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "SEXTA. ACTUALIZACIÓN DE LA RENTA.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Durante la vigencia del contrato, la renta solo podrá actualizarse anualmente en la fecha que se cumpla cada año de vigencia del contrato, aplicando la variación porcentual experimentada por el Índice de Garantía de Competitividad (IGC) o el índice que legalmente lo sustituya, conforme al artículo 17.1 de la LAU.", size: 24 })
        ]
      }),
      
      // SÉPTIMA - FIANZA Y GARANTÍAS
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "SÉPTIMA. FIANZA Y GARANTÍAS ADICIONALES.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "En este acto, el arrendatario hace entrega al arrendador de las siguientes cantidades:", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "a) ", bold: true, size: 24 }),
          new TextRun({ text: "Fianza legal: ", size: 24 }),
          new TextRun({ text: "[IMPORTE] euros", bold: true, size: 24 }),
          new TextRun({ text: ", equivalente a una mensualidad de renta, conforme al artículo 36.1 de la LAU.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "b) ", bold: true, size: 24 }),
          new TextRun({ text: "Garantía adicional: ", size: 24 }),
          new TextRun({ text: "[IMPORTE] euros", bold: true, size: 24 }),
          new TextRun({ text: ", equivalente a dos mensualidades de renta, conforme al artículo 36.5 de la LAU.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Queda expresamente prohibido al arrendatario dejar de satisfacer total o parcialmente cualquier mensualidad de renta alegando su compensación con la fianza o la garantía adicional depositadas.", size: 24 })
        ]
      }),
      
      // OCTAVA - GASTOS Y SUMINISTROS
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "OCTAVA. GASTOS Y SUMINISTROS.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Serán de cuenta del arrendatario los gastos por servicios y suministros individualizados con que cuente la vivienda (electricidad, gas, agua, telecomunicaciones y similares). El arrendatario se obliga a contratar los suministros a su nombre en el plazo máximo de ", size: 24 }),
          new TextRun({ text: "quince días", bold: true, size: 24 }),
          new TextRun({ text: " desde la firma del presente contrato.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Los gastos generales para el sostenimiento del inmueble, sus servicios, tributos, cargas y responsabilidades que correspondan a la vivienda arrendada serán de cuenta del arrendador, sin perjuicio de lo dispuesto en el artículo 20 de la LAU para los gastos de comunidad e IBI.", size: 24 })
        ]
      }),
      
      // NOVENA - CONSERVACIÓN
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "NOVENA. CONSERVACIÓN DE LA VIVIENDA.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendador realizará, sin derecho a elevar la renta, las reparaciones necesarias para conservar la vivienda en condiciones de habitabilidad, salvo cuando el deterioro sea imputable al arrendatario (art. 21 LAU).", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Las pequeñas reparaciones que exija el desgaste por el uso ordinario de la vivienda serán de cargo del arrendatario. A estos efectos, se considerarán pequeñas reparaciones aquellas cuyo coste individual no exceda de ", size: 24 }),
          new TextRun({ text: "150 euros", bold: true, size: 24 }),
          new TextRun({ text: " y su importe acumulado anual no supere el equivalente a una mensualidad de renta.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendatario deberá comunicar al arrendador, en el plazo máximo de ", size: 24 }),
          new TextRun({ text: "cuarenta y ocho horas", bold: true, size: 24 }),
          new TextRun({ text: ", cualquier desperfecto o avería que requiera reparación urgente.", size: 24 })
        ]
      }),
      
      // DÉCIMA - OBRAS
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DÉCIMA. OBRAS.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendatario no podrá realizar sin el consentimiento previo y por escrito del arrendador obras que modifiquen la configuración de la vivienda o que provoquen una disminución en la estabilidad o seguridad de la misma (art. 23 LAU).", size: 24 })
        ]
      }),
      
      // UNDÉCIMA - CESIÓN Y SUBARRIENDO
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "UNDÉCIMA. CESIÓN Y SUBARRIENDO.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Queda prohibida la cesión del contrato y el subarriendo total o parcial de la vivienda sin el consentimiento previo y por escrito del arrendador (art. 8 LAU).", size: 24 })
        ]
      }),
      
      // DUODÉCIMA - DESISTIMIENTO
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DUODÉCIMA. DESISTIMIENTO.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendatario podrá desistir del contrato una vez hayan transcurrido al menos seis meses, siempre que lo comunique al arrendador con una antelación mínima de treinta días (art. 11 LAU).", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "En caso de desistimiento, el arrendatario deberá indemnizar al arrendador con una cantidad equivalente a ", size: 24 }),
          new TextRun({ text: "una mensualidad de renta por cada año de contrato que reste por cumplir", bold: true, size: 24 }),
          new TextRun({ text: ", prorrateándose los períodos inferiores al año.", size: 24 })
        ]
      }),
      
      // DECIMOTERCERA - RESOLUCIÓN
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DECIMOTERCERA. CAUSAS DE RESOLUCIÓN.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendador podrá resolver de pleno derecho el contrato por las causas previstas en el artículo 27.2 de la LAU, en particular:", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "a) ", bold: true, size: 24 }),
          new TextRun({ text: "La falta de pago de la renta o de cualquiera de las cantidades cuyo pago corresponda al arrendatario.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "b) ", bold: true, size: 24 }),
          new TextRun({ text: "La falta de pago del importe de la fianza o su actualización.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "c) ", bold: true, size: 24 }),
          new TextRun({ text: "El subarriendo o la cesión inconsentidos.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "d) ", bold: true, size: 24 }),
          new TextRun({ text: "La realización de daños causados dolosamente o de obras no consentidas.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "e) ", bold: true, size: 24 }),
          new TextRun({ text: "La realización de actividades molestas, insalubres, nocivas, peligrosas o ilícitas.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "f) ", bold: true, size: 24 }),
          new TextRun({ text: "El destino de la vivienda a fines distintos del pactado.", size: 24 })
        ]
      }),
      
      // DECIMOCUARTA - MASC
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DECIMOCUARTA. SOLUCIÓN DE CONTROVERSIAS (MASC).", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Conforme a la Ley Orgánica 1/2025, de 2 de enero, de medidas en materia de eficiencia del Servicio Público de Justicia, las partes acuerdan someter cualquier controversia derivada del presente contrato a ", size: 24 }),
          new TextRun({ text: "Oferta Vinculante Confidencial (OVC)", bold: true, size: 24 }),
          new TextRun({ text: " como medio adecuado de solución de controversias con carácter previo a la vía judicial.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El requerimiento de la OVC deberá cursarse fehacientemente a la otra parte, que dispondrá de un plazo de treinta días para aceptar, rechazar o formular contrapropuesta. Transcurrido dicho plazo sin respuesta, o rechazada la oferta, quedará expedita la vía judicial.", size: 24 })
        ]
      }),
      
      // DECIMOQUINTA - TANTEO Y RETRACTO
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DECIMOQUINTA. RENUNCIA AL DERECHO DE ADQUISICIÓN PREFERENTE.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendatario renuncia expresamente a los derechos de tanteo y retracto que le confiere el artículo 25 de la LAU, conforme a lo dispuesto en el apartado 8 del citado precepto.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "No obstante, el arrendador se obliga a comunicar al arrendatario su intención de vender la vivienda con al menos treinta días de antelación.", size: 24 })
        ]
      }),
      
      // DECIMOSEXTA - OBLIGACIONES ADICIONALES
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DECIMOSEXTA. OBLIGACIONES ADICIONALES DEL ARRENDATARIO.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendatario se obliga, además de lo establecido en las estipulaciones anteriores, a:", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "a) ", bold: true, size: 24 }),
          new TextRun({ text: "Empadronarse en la vivienda arrendada en el plazo máximo de ", size: 24 }),
          new TextRun({ text: "treinta días", bold: true, size: 24 }),
          new TextRun({ text: " desde la firma del presente contrato.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "b) ", bold: true, size: 24 }),
          new TextRun({ text: "Contratar y mantener vigente durante toda la duración del arrendamiento un seguro de hogar que cubra, al menos, los riesgos de responsabilidad civil, incendio y daños por agua.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "c) ", bold: true, size: 24 }),
          new TextRun({ text: "Cumplir las normas de régimen interno de la comunidad de propietarios.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "d) ", bold: true, size: 24 }),
          new TextRun({ text: "Permitir el acceso a la vivienda del arrendador o persona designada por este, previo aviso con al menos 24 horas de antelación, para la realización de reparaciones o inspecciones necesarias.", size: 24 })
        ]
      }),
      
      // DECIMOSÉPTIMA - PENALIZACIÓN
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DECIMOSÉPTIMA. PENALIZACIÓN POR PERMANENCIA INDEBIDA.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "En caso de que el arrendatario no desalojare la vivienda a la terminación del contrato o de cualquiera de sus prórrogas, vendrá obligado a abonar al arrendador una cantidad equivalente al ", size: 24 }),
          new TextRun({ text: "150% de la renta diaria", bold: true, size: 24 }),
          new TextRun({ text: " por cada día de retraso en la entrega de las llaves, sin perjuicio de las acciones judiciales que correspondan.", size: 24 })
        ]
      }),
      
      // DECIMOCTAVA - JURISDICCIÓN
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "DECIMOCTAVA. JURISDICCIÓN Y COMPETENCIA.", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Para cuantas cuestiones litigiosas pudieran derivarse del presente contrato, las partes se someten a la jurisdicción de los Tribunales de Instancia del lugar donde radique la vivienda arrendada.", size: 24 })
        ]
      }),
      
      // CIERRE
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 400, after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Y en prueba de conformidad con cuanto antecede, las partes firman el presente contrato por duplicado y a un solo efecto, en el lugar y fecha indicados en el encabezamiento.", size: 24 })
        ]
      }),
      
      // FIRMAS
      new Paragraph({
        spacing: { before: 600, after: 200 },
        children: [
          new TextRun({ text: "", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({ text: "EL ARRENDADOR\t\t\t\t\t\tEL ARRENDATARIO", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { before: 600, after: 200 },
        children: [
          new TextRun({ text: "", size: 24 })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Fdo.: _______________________\t\t\t\tFdo.: _______________________", size: 24 })
        ]
      }),
      
      // SALTO DE PÁGINA - ANEXO I
      new Paragraph({
        children: [new PageBreak()]
      }),
      
      // ANEXO I
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "ANEXO I – INVENTARIO", bold: true, size: 28 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Relación de muebles, enseres y electrodomésticos que se encuentran en la vivienda en el momento de la entrega:", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "SALÓN/COMEDOR:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "[Describir mobiliario]", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({ text: "COCINA:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "[Describir electrodomésticos y mobiliario]", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({ text: "DORMITORIO PRINCIPAL:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "[Describir mobiliario]", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({ text: "DORMITORIO SECUNDARIO:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "[Describir mobiliario]", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({ text: "BAÑO:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "[Describir equipamiento]", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 200, after: 200 },
        children: [
          new TextRun({ text: "OTROS:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "[Llaves, mandos, otros elementos]", size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({ text: "Estado general de la vivienda: ", size: 24 }),
          new TextRun({ text: "[BUENO/NORMAL/CON OBSERVACIONES]", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Observaciones: [Indicar desperfectos o situaciones especiales preexistentes]", size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({ text: "Conforme,", size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({ text: "EL ARRENDADOR\t\t\t\t\t\tEL ARRENDATARIO", bold: true, size: 24 })
        ]
      }),
      
      // SALTO DE PÁGINA - ANEXO II
      new Paragraph({
        children: [new PageBreak()]
      }),
      
      // ANEXO II
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({ text: "ANEXO II – ACTA DE ENTREGA DE LLAVES", bold: true, size: 28 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "En [LOCALIDAD], a [DÍA] de [MES] de [AÑO], D./Dña. [NOMBRE ARRENDADOR], en su condición de arrendador, hace entrega a D./Dña. [NOMBRE ARRENDATARIO], en su condición de arrendatario, de las llaves de la vivienda sita en [DIRECCIÓN COMPLETA].", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Llaves entregadas:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "- [X] juego(s) de llaves del portal", size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "- [X] juego(s) de llaves de la vivienda", size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "- [X] mando(s) de garaje", size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "- [X] llave(s) de buzón", size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "- [Otros: especificar]", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Lecturas de contadores:", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "- Electricidad: [LECTURA] kWh", size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "- Gas: [LECTURA] m³", size: 24 })
        ]
      }),
      new Paragraph({
        indent: { left: 360 },
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "- Agua: [LECTURA] m³", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendatario declara recibir la vivienda en perfecto estado de conservación y limpieza, apta para el uso al que se destina, conforme al inventario que figura como Anexo I del contrato de arrendamiento.", size: 24 })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Y para que así conste, firman la presente acta por duplicado.", size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({ text: "EL ARRENDADOR\t\t\t\t\t\tEL ARRENDATARIO", bold: true, size: 24 })
        ]
      }),
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({ text: "Fdo.: _______________________\t\t\t\tFdo.: _______________________", size: 24 })
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/tmp/contrato_arrendamiento.docx', buffer);
  console.log('Contrato generado: /tmp/contrato_arrendamiento.docx');
});
