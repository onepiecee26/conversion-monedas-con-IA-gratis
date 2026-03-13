// Script de actualización de IDs de AdSense
// Este script te ayudará a actualizar todos los IDs de anuncios en tu conversor

const CONFIGURACION_ADSENSE = {
    // Tu información de AdSense
    publisherId: 'ca-pub-1913399723778376',
    
    // IDs de anuncios (actualiza estos valores cuando crees tus anuncios en AdSense)
    adUnits: {
        bannerSuperior: '1370663935',      // ✅ Ya configurado
        bannerLateral: '[TU_ID_LATERAL]',     // ⏳ Pendiente
        mobileResponsive: '[TU_ID_MOBILE]',  // ⏳ Pendiente  
        intersticial: '[TU_ID_INTERSTICIAL]', // ⏳ Pendiente
        inFeed: '[TU_ID_INFEED]'            // ⏳ Pendiente
    },
    
    // Configuración de ubicaciones
    locations: {
        bannerSuperior: {
            name: 'Banner Superior (728×90)',
            description: 'Visible en todos los dispositivos, arriba del contenido principal',
            size: '728x90',
            type: 'display'
        },
        bannerLateral: {
            name: 'Banner Lateral (160×600)',
            description: 'Solo desktop, columna derecha sticky',
            size: '160x600', 
            type: 'display'
        },
        mobileResponsive: {
            name: 'Anuncio Móvil (Responsive)',
            description: 'Visible solo en dispositivos móviles',
            size: 'responsive',
            type: 'display'
        },
        intersticial: {
            name: 'Anuncio Intersticial (Fluid)',
            description: 'Entre secciones principales del contenido',
            size: 'fluid',
            type: 'in-feed'
        },
        inFeed: {
            name: 'Anuncio In-Feed',
            description: 'Integrado con el contenido del conversor',
            size: 'fluid',
            type: 'in-feed'
        }
    }
};

// Función para generar IDs de anuncios sugeridos basados en tu publisher ID
function generarIDsSugeridos() {
    const publisherId = '1913399723778376'; // Tu ID numérico
    const idsSugeridos = {};
    
    // Generar IDs basados en tu publisher ID + offset
    const baseId = parseInt(publisherId.substring(0, 8));
    
    idsSugeridos.bannerLateral = String(baseId + 1);
    idsSugeridos.mobileResponsive = String(baseId + 2);  
    idsSugeridos.intersticial = String(baseId + 3);
    idsSugeridos.inFeed = String(baseId + 4);
    
    return idsSugeridos;
}

// Función para crear plantilla de anuncio
function crearPlantillaAnuncio(locationKey, customStyles = '') {
    const config = CONFIGURACION_ADSENSE.locations[locationKey];
    const adUnitId = CONFIGURACION_ADSENSE.adUnits[locationKey];
    
    // Detectar si es un ID real o temporal
    const isRealId = !adUnitId.includes('[TU_ID') && adUnitId.length > 5;
    
    let adCode = `
<!-- ${config.name} -->
<ins class="adsbygoogle"
     style="display:block${customStyles}"
     data-ad-client="${CONFIGURACION_ADSENSE.publisherId}"
     data-ad-slot="${adUnitId}"
     data-ad-format="${config.size === 'responsive' ? 'auto' : (config.size === 'fluid' ? 'fluid' : 'auto')}"
     ${config.size === 'fluid' ? 'data-ad-layout-key="-fb+5w+4e-38+4f"' : ''}
     data-full-width-responsive="${config.size === 'responsive' ? 'true' : 'false'}"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
<\/script>
`;

    // Agregar mensaje de estado
    const statusMessage = `
<!-- Estado: ${isRealId ? '✅ ID real configurado' : '⚠️ ID temporal - actualizar cuando crees el anuncio en AdSense'} -->
<!-- Descripción: ${config.description} -->
<!-- Tipo: ${config.type} | Tamaño: ${config.size} -->
`;

    return statusMessage + adCode;
}

// Función para actualizar el archivo HTML
function actualizarHTMLConIDs() {
    console.log('📋 Resumen de actualización de anuncios:');
    console.log('=====================================');
    
    // Mostrar IDs sugeridos
    const idsSugeridos = generarIDsSugeridos();
    console.log('💡 IDs sugeridos para tus anuncios:');
    Object.keys(idsSugeridos).forEach(key => {
        console.log(`   ${key}: ${idsSugeridos[key]}`);
    });
    
    console.log('\n📍 Ubicaciones de anuncios en tu HTML:');
    
    Object.keys(CONFIGURACION_ADSENSE.locations).forEach(locationKey => {
        const config = CONFIGURACION_ADSENSE.locations[locationKey];
        const currentId = CONFIGURACION_ADSENSE.adUnits[locationKey];
        const isRealId = !currentId.includes('[TU_ID') && currentId.length > 5;
        
        console.log(`\n📌 ${config.name}:`);
        console.log(`   📖 ${config.description}`);
        console.log(`   🎯 ID actual: ${currentId} ${isRealId ? '✅' : '⚠️'}`);
        
        if (!isRealId) {
            console.log(`   💡 ID sugerido: ${idsSugeridos[locationKey]}`);
            console.log(`   📝 Para actualizar: Busca "${locationKey}" en index.html`);
        }
    });
    
    console.log('\n🛠️ Pasos para actualizar tus anuncios:');
    console.log('1. Crea los anuncios en tu panel de AdSense con los nombres sugeridos');
    console.log('2. Copia los IDs reales de cada anuncio');
    console.log('3. Abre index.html en tu editor');
    console.log('4. Busca cada ubicación de anuncio por el nombre del comentario');
    console.log('5. Reemplaza los IDs temporales con los reales');
    console.log('6. Guarda y actualiza tu página');
    
    console.log('\n🎯 Ubicaciones específicas en index.html:');
    console.log('   • Banner Superior: Línea ~45 (ya configurado)');
    console.log('   • Banner Lateral: Busca "<!-- Banner Lateral -->"');
    console.log('   • Anuncio Móvil: Busca "<!-- Anuncio Móvil -->"');
    console.log('   • Intersticial: Busca "<!-- Anuncio Intersticial -->"');
    console.log('   • In-Feed: Busca "<!-- Anuncio In-Feed -->"');
}

// Función para verificar el estado de configuración
function verificarEstadoConfiguracion() {
    console.log('🔍 Verificación de estado de AdSense:');
    console.log('=====================================');
    
    let totalAnuncios = 0;
    let anunciosConfigurados = 0;
    
    Object.keys(CONFIGURACION_ADSENSE.adUnits).forEach(key => {
        totalAnuncios++;
        const adUnitId = CONFIGURACION_ADSENSE.adUnits[key];
        const isRealId = !adUnitId.includes('[TU_ID') && adUnitId.length > 5;
        
        if (isRealId) {
            anunciosConfigurados++;
            console.log(`✅ ${key}: ${adUnitId}`);
        } else {
            console.log(`⚠️ ${key}: ${adUnitId} (pendiente de configurar)`);
        }
    });
    
    const porcentaje = (anunciosConfigurados / totalAnuncios) * 100;
    console.log(`\n📊 Progreso: ${anunciosConfigurados}/${totalAnuncios} anuncios configurados (${porcentaje.toFixed(0)}%)`);
    
    if (porcentaje === 100) {
        console.log('🎉 ¡Todos los anuncios están configurados! Tu conversor está listo para generar ingresos.');
    } else {
        console.log(`💡 Te faltan ${totalAnuncios - anunciosConfigurados} anuncios por configurar.`);
    }
    
    return { totalAnuncios, anunciosConfigurados, porcentaje };
}

// Función para generar código HTML completo con todos los anuncios
function generarCodigoCompleto() {
    console.log('🚀 Generando código HTML completo con anuncios...');
    
    let codigoCompleto = `
<!-- ======================================== -->
<!-- CÓDIGO DE ANUNCIOS PARA CONVERSOR DE DIVISAS -->
<!-- Editor ID: ${CONFIGURACION_ADSENSE.publisherId} -->
<!-- ======================================== -->

`;
    
    Object.keys(CONFIGURACION_ADSENSE.locations).forEach(locationKey => {
        codigoCompleto += crearPlantillaAnuncio(locationKey);
        codigoCompleto += '\n\n';
    });
    
    console.log(codigoCompleto);
    console.log('\n📋 Código generado con éxito!');
    console.log('Copia y pega estas secciones en las ubicaciones correspondientes de tu index.html');
    
    return codigoCompleto;
}

// Ejecutar verificación inicial
console.log('🎯 CONFIGURADOR DE ADSENSE PARA CONVERSOR DE DIVISAS');
console.log('==============================================');
verificarEstadoConfiguracion();

// Comandos disponibles:
console.log('\n📋 COMANDOS DISPONIBLES:');
console.log('• verificarEstadoConfiguracion() - Ver estado actual');
console.log('• actualizarHTMLConIDs() - Ver instrucciones de actualización');
console.log('• generarCodigoCompleto() - Generar código HTML completo');
console.log('• generarIDsSugeridos() - Ver IDs sugeridos para nuevos anuncios');

// Exportar para uso externo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIGURACION_ADSENSE,
        generarIDsSugeridos,
        crearPlantillaAnuncio,
        verificarEstadoConfiguracion,
        generarCodigoCompleto
    };
}