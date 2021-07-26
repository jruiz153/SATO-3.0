export interface Guia{
    Guia:string;
    Fecha_Captura:string;
    Cod_Regional: number;
    Cod_Formapago: number;
    Cons_Guiasu:number;
    Estado:string;
    Cod_Estadog: number;

    Nom_Servicio:string;
    Nom_CiudadO:string;
    Nom_CiudadD:string;
    Nom_Remitente:string;
    Nom_Destinatario:string;
    Tel_Remitente:string;
    Dir_Destinatario:string;


    Tel_Destinatario:string;
    Dice_Contener:string;
    Dias_Cubrimiento:string;
    Estimado_Entrega:string;
    Oficina_Cuenta:string;
    Cuenta:string;
    Bolsa_Seguridad:string;


    Num_Unidades:number;
    PesoReal_K:number;
    PesoVolumen_K:number;
    K_Cobrados:number;
    Valor_Declarado:number;
    Valor_Flete:number;
    Valor_Total:number;
    Valor_CostoM:number;
    Valor_Otros:number;

    Fecha_Recoleccion:string;
    Num_PlanillaR:number;
    Nom_Responsable_RC:string;
    Nro_Placa:string;
    Fecha_Despacho:string;
    Cod_Regional_RV:number;
    Num_RelacionV:number;

    Nom_Responsable_RV:string;
    Fecha_Reparto:string;
    Num_PlanillaRpto:number;
    Fecha_Entrega:string;
    Hora_Entrega:string;
    Memo_SAC:string;


    Texto_Guia:string;
    Documentos:string;
    Num_ControlC:number;
    Cod_RutaR:number;

    Nom_Responsable_PRP:string;
}