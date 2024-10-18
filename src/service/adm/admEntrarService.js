import { validarAdm } from "../../repository/admRepository.js";

export default function validarAdmService (adm) {
    let registro = validarAdm(adm)
    return registro
}