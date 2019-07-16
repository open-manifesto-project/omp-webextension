
PROPOSALS = {

    0: {

        "polticalParty": "cs",
        "title": "La España de ciudadanos libres e iguales",

    },

    1: {

        "politicalParty": "cs",
        "title": "Mejoraremos los instrumentos para proteger a los españoles de los golpes de Estado en el siglo XXI. El golpe de Estado de los separatistas catalanes de otoño de 2017 tenía un objetivo claro: liquidar la Constitución y sustituir la legalidad vigente por un marco legal alternativo, saltándose los procedimientos democráticos y vulnerando los derechos fundamentales de millones de catalanes. Actualizaremos el delito de sedición y rebelión en el Código Penal y reforzaremos los instrumentos de la Ley de Seguridad Nacional y de la Ley de Estabilidad Presupuestaria para asegurar que la labor de los Mossos d’Esquadra responde a la defensa leal de la Constitución y que no se destina ni un sólo euro de dinero público a financiar ninguna actividad vinculada al procés separatista.",
    }

}


def read():
    return [PROPOSALS[key] for key in sorted(PROPOSALS.keys())]
