export const registerGeneralFormWithNaturalFields = [
  {
    type: 'selector',
    label: 'Tipo de Documento',
    controlName: 'documentType',
  },
  {
    type: 'text',
    label: 'Numero del Documento',
    controlName: 'documentNumber',
  },
  {
    type: 'text',
    label: 'Primer Nombre',
    controlName: 'firstName',
  },
  {
    type: 'text',
    label: 'Segundo Nombre',
    controlName: 'middleName',
  },
  {
    type: 'text',
    label: 'Primer Apellido',
    controlName: 'lastName',
  },
  {
    type: 'text',
    label: 'Segundo Apellido',
    controlName: 'secondLastName',
  },
];

export const registerGeneralFormWithJuridicaFields = [
  {
    type: 'text',
    label: 'NIT',
    controlName: 'documentNumber',
  },
  {
    type: 'text',
    label: 'Razon Social',
    controlName: 'companyName',
  },
];
