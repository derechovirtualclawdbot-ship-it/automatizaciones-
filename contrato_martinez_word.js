const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Times New Roman", size: 22 }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1418 }
      }
    },
    children: [
      // TÍTULO
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new TextRun({ text: "CONTRATO DE ARRENDAMIENTO DE VIVIENDA", bold: true, size: 26 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 400 },
        children: [new TextRun({ text: "En Sevilla, a 12 de febrero de 2026", size: 22 })]
      }),
      
      // COMPARECEN
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: "COMPARECEN", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "De una parte, como ", size: 22 }),
          new TextRun({ text: "ARRENDADOR", bold: true, size: 22 }),
          new TextRun({ text: ", D. ", size: 22 }),
          new TextRun({ text: "FRANCISCO JAVIER MARTÍNEZ LÓPEZ", bold: true, size: 22 }),
          new TextRun({ text: ", mayor de edad, nacido el 3 de abril de 1978, de nacionalidad española, con DNI núm. ", size: 22 }),
          new TextRun({ text: "28.456.913-L", bold: true, size: 22 }),
          new TextRun({ text: ", estado civil casado en régimen de separación de bienes, con domicilio a efectos de notificaciones en Sevilla, teléfono 6XX XXX XXX y correo electrónico fjmartinez@email.com.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "De otra parte, como ", size: 22 }),
          new TextRun({ text: "ARRENDATARIA", bold: true, size: 22 }),
          new TextRun({ text: ", Dña. ", size: 22 }),
          new TextRun({ text: "MARÍA ELENA RUIZ GARCÍA", bold: true, size: 22 }),
          new TextRun({ text: ", mayor de edad, nacida el 15 de julio de 1990, de nacionalidad española, con DNI núm. ", size: 22 }),
          new TextRun({ text: "30.987.654-T", bold: true, size: 22 }),
          new TextRun({ text: ", empleada por cuenta ajena como farmacéutica en el Hospital Universitario Virgen del Rocío de Sevilla, teléfono y correo electrónico que constan en la documentación aportada.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Ambas partes se reconocen capacidad legal suficiente para el otorgamiento del presente contrato de arrendamiento de vivienda y, a tal efecto,", size: 22 })]
      }),
      
      // EXPONEN
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: "EXPONEN", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "I. Propiedad del inmueble.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Que el arrendador es propietario pleno, con carácter privativo, de la siguiente finca urbana:", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "VIVIENDA sita en ", size: 22 }),
          new TextRun({ text: "Avenida de Coria núm. 43, piso 3º, letra B, C.P. 41010, Sevilla, Barrio de Triana", bold: true, size: 22 }),
          new TextRun({ text: ", en el edificio denominado Residencial \"Coria Plaza\", construido en el año 2008.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Referencia catastral: ", size: 22 }),
          new TextRun({ text: "1234567TG3413S0003AB", bold: true, size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Inscrita en el Registro de la Propiedad núm. 3 de Sevilla, finca registral núm. ", size: 22 }),
          new TextRun({ text: "18.742", bold: true, size: 22 }),
          new TextRun({ text: ", tomo 2.145, libro 389, folio 112.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "La vivienda tiene una superficie construida de 112 m² y útil de 94 m², distribuida en: salón-comedor de 24 m², cocina independiente de 12 m² completamente equipada, dormitorio principal de 15 m² con baño en suite, dos dormitorios secundarios de 11 m² y 10 m², dos baños completos y terraza exterior de 6 m².", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "ANEJOS vinculados: ", bold: true, size: 22 }),
          new TextRun({ text: "plaza de garaje núm. 27 (12 m²) en planta sótano y trastero núm. 14 (5 m²).", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "El título de propiedad lo constituye escritura pública de compraventa otorgada ante el Notario de Sevilla D. Manuel Rodríguez Pardo, el día 18 de septiembre de 2015, protocolo núm. 2.187. La finca se encuentra libre de cargas, gravámenes, arrendamientos previos y afecciones fiscales pendientes.", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "II. Condición del arrendador.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendador declara ", size: 22 }),
          new TextRun({ text: "NO TENER", bold: true, size: 22 }),
          new TextRun({ text: " la condición de gran tenedor conforme al artículo 3.k) de la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda. Asimismo, declara que la vivienda ", size: 22 }),
          new TextRun({ text: "NO SE ENCUENTRA", bold: true, size: 22 }),
          new TextRun({ text: " situada en zona de mercado residencial tensionado.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "III. Estado de la vivienda.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "La vivienda se encuentra en perfecto estado de conservación, recién pintada, con suelos de tarima flotante, carpintería exterior de aluminio con doble acristalamiento, aire acondicionado centralizado frío/calor y termo eléctrico de 100 litros.", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Se arrienda totalmente amueblada, según inventario que se adjunta como Anexo I, incluyendo: sofá, mesa de comedor y sillas, tres camas con colchones, armarios empotrados revestidos, lavadora, frigorífico, horno, vitrocerámica, microondas, lavavajillas y televisor de 55 pulgadas.", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "IV. Certificado de eficiencia energética.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "La vivienda dispone de Certificado de Eficiencia Energética vigente, que se entrega a la arrendataria como parte integrante del presente contrato.", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "V. Voluntad de contratar.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Que ambas partes, libre y voluntariamente, han convenido celebrar el presente contrato de arrendamiento de vivienda habitual, que se regirá por la Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos (en adelante, LAU), la Ley 12/2023, de 24 de mayo, por el derecho a la vivienda, la Ley Orgánica 1/2025, de 2 de enero, y supletoriamente por el Código Civil, con sujeción a las siguientes", size: 22 })]
      }),
      
      // ESTIPULACIONES
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: "ESTIPULACIONES", bold: true, size: 22 })]
      }),
      
      // PRIMERA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "PRIMERA. OBJETO DEL CONTRATO.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El arrendador cede en arrendamiento a la arrendataria, que acepta, el uso de la vivienda descrita en el Expositivo I, con sus anejos (plaza de garaje y trastero), destinada ", size: 22 }),
          new TextRun({ text: "EXCLUSIVAMENTE", bold: true, size: 22 }),
          new TextRun({ text: " a satisfacer la necesidad permanente de vivienda habitual de la arrendataria.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La arrendataria manifiesta que ocupará la vivienda junto con su pareja, D. ", size: 22 }),
          new TextRun({ text: "Carlos Jiménez Ortega", bold: true, size: 22 }),
          new TextRun({ text: ", mayor de edad, ingeniero informático de profesión. Queda expresamente prohibido el uso de la vivienda para cualquier otra finalidad distinta de la residencia habitual, en particular queda prohibido su destino a vivienda turística, de temporada, o para el ejercicio de actividades profesionales, comerciales o industriales.", size: 22 })
        ]
      }),
      
      // SEGUNDA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "SEGUNDA. DURACIÓN.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "El plazo de duración del presente contrato se fija en ", size: 22 }),
          new TextRun({ text: "UN (1) AÑO", bold: true, size: 22 }),
          new TextRun({ text: ", comenzando el día ", size: 22 }),
          new TextRun({ text: "1 de marzo de 2026", bold: true, size: 22 }),
          new TextRun({ text: " y finalizando el día ", size: 22 }),
          new TextRun({ text: "28 de febrero de 2027", bold: true, size: 22 }),
          new TextRun({ text: ".", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Si la duración pactada fuera inferior a cinco años, el contrato se prorrogará obligatoriamente por plazos anuales hasta alcanzar una duración mínima de cinco años, salvo que la arrendataria manifieste al arrendador, con treinta días de antelación como mínimo a la fecha de terminación del contrato o de cualquiera de sus prórrogas, su voluntad de no renovarlo (art. 9.1 LAU).", size: 22 })]
      }),
      
      // TERCERA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "TERCERA. RESERVA DE NECESIDAD.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "El arrendador se reserva expresamente el derecho a recuperar la vivienda antes del transcurso de cinco años, conforme al artículo 9.3 de la LAU, para destinarla a vivienda permanente para sí mismo o para sus familiares en primer grado de consanguinidad o por adopción, o para su cónyuge en los supuestos de sentencia firme de separación, divorcio o nulidad matrimonial.", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Para ejercer este derecho, el arrendador deberá comunicar a la arrendataria su necesidad de ocupar la vivienda con al menos ", size: 22 }),
          new TextRun({ text: "DOS MESES", bold: true, size: 22 }),
          new TextRun({ text: " de antelación a la fecha en que deba quedar libre.", size: 22 })
        ]
      }),
      
      // CUARTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "CUARTA. PRÓRROGA.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Transcurrido el período de prórroga obligatoria de cinco años, si ninguna de las partes hubiere notificado a la otra, con al menos cuatro meses de antelación en el caso del arrendador y dos meses en el caso de la arrendataria, su voluntad de no renovar el contrato, este se prorrogará por plazos anuales hasta un máximo de tres años adicionales (art. 10.1 LAU).", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La arrendataria ", size: 22 }),
          new TextRun({ text: "RENUNCIA EXPRESAMENTE", bold: true, size: 22 }),
          new TextRun({ text: " a las prórrogas extraordinarias previstas en los apartados 2 y 3 del artículo 10 de la LAU, renuncia que resulta legalmente admisible al no tener el arrendador la condición de gran tenedor.", size: 22 })
        ]
      }),
      
      // QUINTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "QUINTA. RENTA.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La renta mensual se fija en ", size: 22 }),
          new TextRun({ text: "MIL CIENTO CINCUENTA EUROS (1.150 €)", bold: true, size: 22 }),
          new TextRun({ text: ", que la arrendataria se obliga a abonar por mensualidades anticipadas, ", size: 22 }),
          new TextRun({ text: "ANTES DEL DÍA 5 DE CADA MES", bold: true, size: 22 }),
          new TextRun({ text: ".", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "El pago se realizará EXCLUSIVAMENTE mediante transferencia bancaria a la cuenta titularidad del arrendador:", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 150 },
        children: [new TextRun({ text: "IBAN: ES76 2100 1234 56 0200123456", bold: true, size: 22 })]
      }),
      
      // SEXTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "SEXTA. ACTUALIZACIÓN DE LA RENTA.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Durante la vigencia del contrato, la renta se actualizará anualmente en la fecha que se cumpla cada año de vigencia, aplicando la variación porcentual experimentada por el Índice de Garantía de Competitividad (IGC) publicado por el INE, o el índice que legalmente lo sustituya conforme al artículo 17.1 de la LAU.", size: 22 })]
      }),
      
      // SÉPTIMA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "SÉPTIMA. FIANZA Y GARANTÍAS ADICIONALES.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "En este acto, la arrendataria hace entrega al arrendador de las siguientes cantidades:", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "a) FIANZA LEGAL: ", bold: true, size: 22 }),
          new TextRun({ text: "1.150 € (MIL CIENTO CINCUENTA EUROS), equivalente a una mensualidad de renta, conforme al artículo 36.1 de la LAU.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { left: 720 },
        children: [
          new TextRun({ text: "b) GARANTÍA ADICIONAL: ", bold: true, size: 22 }),
          new TextRun({ text: "2.300 € (DOS MIL TRESCIENTOS EUROS), equivalente a dos mensualidades de renta, conforme al artículo 36.5 de la LAU.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Queda ", size: 22 }),
          new TextRun({ text: "EXPRESAMENTE PROHIBIDO", bold: true, size: 22 }),
          new TextRun({ text: " a la arrendataria dejar de satisfacer total o parcialmente cualquier mensualidad de renta, o las mensualidades finales del contrato, alegando su compensación con la fianza o la garantía adicional depositadas.", size: 22 })
        ]
      }),
      
      // OCTAVA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "OCTAVA. GASTOS Y SUMINISTROS.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Serán de cuenta de la ", size: 22 }),
          new TextRun({ text: "ARRENDATARIA", bold: true, size: 22 }),
          new TextRun({ text: ": suministros individualizados (electricidad, gas, agua y telecomunicaciones) y tasa municipal de recogida de basuras.", size: 22 })
        ]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Serán de cuenta del ", size: 22 }),
          new TextRun({ text: "ARRENDADOR", bold: true, size: 22 }),
          new TextRun({ text: ": Impuesto sobre Bienes Inmuebles (IBI) y cuotas ordinarias de la comunidad de propietarios.", size: 22 })
        ]
      }),
      
      // NOVENA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "NOVENA. CONSERVACIÓN DE LA VIVIENDA.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "El arrendador realizará las reparaciones necesarias para conservar la vivienda en condiciones de habitabilidad, salvo cuando el deterioro sea imputable a la arrendataria. Las pequeñas reparaciones por desgaste ordinario (hasta 150 € individuales y una mensualidad acumulada anual) serán de cargo de la arrendataria.", size: 22 })]
      }),
      
      // DÉCIMA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DÉCIMA. OBRAS.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La arrendataria ", size: 22 }),
          new TextRun({ text: "NO PODRÁ", bold: true, size: 22 }),
          new TextRun({ text: " realizar, sin el consentimiento previo y por escrito del arrendador, obras que modifiquen la configuración de la vivienda o que afecten a su estabilidad o seguridad (art. 23 LAU).", size: 22 })
        ]
      }),
      
      // UNDÉCIMA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "UNDÉCIMA. PROHIBICIÓN ABSOLUTA DE CESIÓN Y SUBARRIENDO.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Queda ", size: 22 }),
          new TextRun({ text: "TERMINANTEMENTE PROHIBIDA", bold: true, size: 22 }),
          new TextRun({ text: " la cesión del contrato y el subarriendo total o parcial de la vivienda, en cualquier modalidad. Se considerará subarriendo encubierto el alojamiento de personas distintas de las autorizadas por períodos superiores a quince días. Queda igualmente prohibido el uso para alquiler turístico o por habitaciones.", size: 22 })
        ]
      }),
      
      // DUODÉCIMA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DUODÉCIMA. EMPADRONAMIENTO.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La arrendataria queda autorizada para empadronarse en la vivienda. Queda ", size: 22 }),
          new TextRun({ text: "EXPRESAMENTE PROHIBIDO", bold: true, size: 22 }),
          new TextRun({ text: " el empadronamiento de cualquier otra persona distinta de la arrendataria y de D. Carlos Jiménez Ortega, salvo autorización previa y por escrito del arrendador.", size: 22 })
        ]
      }),
      
      // DECIMOTERCERA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DECIMOTERCERA. DESISTIMIENTO.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "La arrendataria podrá desistir tras seis meses, con preaviso de treinta días. Deberá indemnizar con ", size: 22 }),
          new TextRun({ text: "UNA MENSUALIDAD POR CADA AÑO QUE RESTE", bold: true, size: 22 }),
          new TextRun({ text: ", prorrateándose los períodos inferiores.", size: 22 })
        ]
      }),
      
      // DECIMOCUARTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DECIMOCUARTA. CAUSAS DE RESOLUCIÓN.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "El arrendador podrá resolver de pleno derecho el contrato por las causas del artículo 27.2 LAU: falta de pago de renta o cantidades debidas; impago de fianza; subarriendo o cesión inconsentidos; daños dolosos u obras no consentidas; actividades molestas, insalubres, nocivas, peligrosas o ilícitas; destino distinto del pactado; empadronamiento de terceros no autorizados; uso turístico.", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Conforme al artículo 22.4 LEC, no procederá la enervación del desahucio cuando el arrendador hubiese requerido de pago con al menos treinta días de antelación a la demanda.", size: 22 })]
      }),
      
      // DECIMOQUINTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DECIMOQUINTA. ACTIVIDADES PROHIBIDAS.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Queda prohibido realizar actividades molestas, insalubres, nocivas, peligrosas o ilícitas; actividades profesionales, comerciales o industriales; alojamiento turístico o alquiler por habitaciones; tenencia de animales peligrosos sin autorización.", size: 22 })]
      }),
      
      // DECIMOSEXTA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DECIMOSEXTA. SOLUCIÓN DE CONTROVERSIAS (MASC).", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Conforme a la Ley Orgánica 1/2025, las partes acuerdan someter cualquier controversia a ", size: 22 }),
          new TextRun({ text: "OFERTA VINCULANTE CONFIDENCIAL (OVC)", bold: true, size: 22 }),
          new TextRun({ text: " con carácter previo a la vía judicial. La parte requerida dispondrá de treinta días para responder.", size: 22 })
        ]
      }),
      
      // DECIMOSÉPTIMA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DECIMOSÉPTIMA. RENUNCIA AL DERECHO DE ADQUISICIÓN PREFERENTE.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "La arrendataria RENUNCIA EXPRESAMENTE a los derechos de tanteo y retracto del artículo 25 LAU. El arrendador comunicará su intención de venta con treinta días de antelación.", size: 22 })]
      }),
      
      // DECIMOCTAVA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DECIMOCTAVA. OBLIGACIONES ADICIONALES.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "La arrendataria se obliga a: contratar seguro de hogar con cobertura mínima de 150.000 €; cumplir las normas de la comunidad de propietarios; permitir acceso para reparaciones con preaviso de 24 horas; mantener la vivienda en buen estado.", size: 22 })]
      }),
      
      // DECIMONOVENA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "DECIMONOVENA. PENALIZACIÓN POR PERMANENCIA INDEBIDA.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 150 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Si la arrendataria no desaloja la vivienda a la terminación del contrato, abonará ", size: 22 }),
          new TextRun({ text: "150% DE LA RENTA DIARIA (86,25 €/día)", bold: true, size: 22 }),
          new TextRun({ text: " por cada día de retraso, sin perjuicio de las acciones judiciales.", size: 22 })
        ]
      }),
      
      // VIGÉSIMA
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
        children: [new TextRun({ text: "VIGÉSIMA. JURISDICCIÓN Y COMPETENCIA.", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [
          new TextRun({ text: "Para cuantas cuestiones litigiosas pudieran derivarse, las partes, con renuncia a cualquier otro fuero, ", size: 22 }),
          new TextRun({ text: "SE SOMETEN A LOS TRIBUNALES DE INSTANCIA DE SEVILLA", bold: true, size: 22 }),
          new TextRun({ text: ".", size: 22 })
        ]
      }),
      
      // CIERRE
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 200, after: 300 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "Y en prueba de conformidad, las partes firman el presente contrato por duplicado y a un solo efecto, en el lugar y fecha indicados.", size: 22 })]
      }),
      
      // FIRMAS
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({ text: "EL ARRENDADOR\t\t\t\t\t\tLA ARRENDATARIA", bold: true, size: 22 })
        ]
      }),
      
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({ text: "Fdo.: Francisco Javier Martínez López\t\t\tFdo.: María Elena Ruiz García", size: 22 })
        ]
      }),
      
      // ANEXO I
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new TextRun({ text: "ANEXO I – INVENTARIO", bold: true, size: 26 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Relación de muebles, enseres y electrodomésticos en la vivienda de Avda. de Coria nº 43, 3º B, Sevilla:", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "SALÓN-COMEDOR:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "Sofá 3 plazas, mesa comedor extensible con 6 sillas, mueble TV, televisor Samsung 55\", mesa centro cristal, lámpara pie.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 150, after: 100 },
        children: [new TextRun({ text: "COCINA:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "Frigorífico Bosch No Frost, horno Balay, vitrocerámica inducción, microondas Samsung, lavavajillas Siemens, lavadora Bosch 8 kg, campana, muebles completos, menaje básico.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 150, after: 100 },
        children: [new TextRun({ text: "DORMITORIO PRINCIPAL:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "Cama 150x190 con colchón, 2 mesillas, armario empotrado 4 puertas, cómoda con espejo.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 150, after: 100 },
        children: [new TextRun({ text: "DORMITORIOS SECUNDARIOS:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "2 camas 90x190 con colchón, 2 mesillas, armarios empotrados 2 puertas, escritorio con silla.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 150, after: 100 },
        children: [new TextRun({ text: "BAÑOS:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "2 baños completos con plato ducha, inodoro, lavabo con mueble, espejo, accesorios.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 150, after: 100 },
        children: [new TextRun({ text: "OTROS:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "Termo eléctrico 100L, A/A centralizado, 4 juegos llaves completos, 2 mandos garaje.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({ text: "Estado: ", size: 22 }),
          new TextRun({ text: "EXCELENTE", bold: true, size: 22 }),
          new TextRun({ text: ". Recién pintada, electrodomésticos funcionando.", size: 22 })
        ]
      }),
      
      new Paragraph({
        spacing: { before: 300 },
        children: [new TextRun({ text: "Conforme,", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 300 },
        children: [new TextRun({ text: "EL ARRENDADOR\t\t\t\t\t\tLA ARRENDATARIA", bold: true, size: 22 })]
      }),
      
      // ANEXO II
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new TextRun({ text: "ANEXO II – ACTA DE ENTREGA DE LLAVES", bold: true, size: 26 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "En Sevilla, a 1 de marzo de 2026, D. Francisco Javier Martínez López hace entrega a Dña. María Elena Ruiz García de las llaves de la vivienda sita en Avda. de Coria nº 43, 3º B, 41010 Sevilla.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "LLAVES ENTREGADAS:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "4 juegos llaves portal, 4 juegos llaves vivienda, 4 llaves buzón, 2 llaves trastero, 2 mandos garaje.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 150, after: 100 },
        children: [new TextRun({ text: "LECTURAS CONTADORES:", bold: true, size: 22 })]
      }),
      new Paragraph({
        indent: { left: 360 },
        children: [new TextRun({ text: "Electricidad: __________ kWh | Gas: __________ m³ | Agua: __________ m³", size: 22 })]
      }),
      
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 200, after: 200 },
        indent: { firstLine: 360 },
        children: [new TextRun({ text: "La arrendataria declara recibir la vivienda en perfecto estado, conforme al inventario del Anexo I.", size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 300 },
        children: [new TextRun({ text: "EL ARRENDADOR\t\t\t\t\t\tLA ARRENDATARIA", bold: true, size: 22 })]
      }),
      
      new Paragraph({
        spacing: { before: 300 },
        children: [new TextRun({ text: "Fdo.: Francisco Javier Martínez López\t\t\tFdo.: María Elena Ruiz García", size: 22 })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/tmp/contrato_martinez_ruiz.docx', buffer);
  console.log('Word generado: /tmp/contrato_martinez_ruiz.docx');
});
