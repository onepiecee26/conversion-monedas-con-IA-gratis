#!/usr/bin/env node

/**
 * Actualizador de IDs de AdSense para Conversor de Divisas
 * Este script te ayuda a actualizar los IDs de anuncios en index.html
 * 
 * USO:
 * node actualizar-ids.js [id_lateral] [id_mobile] [id_intersticial] [id_infeed]
 * 
 * EJEMPLO:
 * node actualizar-ids.js 2345678901 3456789012 4567890123 5678901234
 */

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Verificar argumentos
const args = process.argv.slice(2);

if (args.length !== 4) {
    log('❌ Error: Debes proporcionar exactamente 4 IDs de anuncios', 'red');
    log('');
    log('📋 USO:', 'yellow');
    log('node actualizar-ids.js [id_lateral] [id_mobile] [id_intersticial] [id_infeed]', 'cyan');
    log('');
    log('💡 EJEMPLO:', 'yellow');
    log('node actualizar-ids.js 2345678901 3456789012 4567890123 5678901234', 'cyan');
    log('');
    log('📝 NOTA: Si no tienes los IDs aún, usa:', 'yellow');
    log('node actualizar-ids.js --help', 'cyan');
    process.exit(1);
}

// Mostrar ayuda
if (args[0] === '--help' || args[0] === '-h') {
    mostrarAyuda();
    process.exit(0);
}

const [idLateral, idMobile, idIntersticial, idInfeed] = args;

log('🚀 ACTUALIZADOR DE IDS DE ADSENSE', 'cyan');
log('================================', 'cyan');
log('');

// Verificar que index.html existe
if (!fs.existsSync('index.html')) {
    log('❌ Error: No se encontró el archivo index.html', 'red');
    log('Asegúrate de ejecutar este script desde la carpeta del proyecto', 'yellow');
    process.exit(1);
}

// Leer el archivo
let contenido = fs.readFileSync('index.html', 'utf8');

log('📄 Archivo index.html cargado', 'green');

// Resumen de cambios
log('📊 Resumen de cambios:', 'blue');
log(`Banner Lateral: [TU_ID_LATERAL] → ${idLateral}`, 'yellow');
log(`Mobile Responsive: [TU_ID_MOBILE] → ${idMobile}`, 'yellow');
log(`Intersticial: [TU_ID_INTERSTICIAL] → ${idIntersticial}`, 'yellow');
log(`In-Feed: [TU_ID_INFEED] → ${idInfeed}`, 'yellow');
log('');

// Realizar reemplazos
let cambiosRealizados = 0;

// 1. Banner Lateral
const lateralOriginal = /data-ad-slot="\[TU_ID_LATERAL\]"/;
if (contenido.match(lateralOriginal)) {
    contenido = contenido.replace(lateralOriginal, `data-ad-slot="${idLateral}"`);
    cambiosRealizados++;
    log(`✅ Banner Lateral actualizado`, 'green');
} else {
    log(`⚠️  Banner Lateral no encontrado o ya actualizado`, 'yellow');
}

// 2. Mobile Responsive
const mobileOriginal = /data-ad-slot="\[TU_ID_MOBILE\]"/;
if (contenido.match(mobileOriginal)) {
    contenido = contenido.replace(mobileOriginal, `data-ad-slot="${idMobile}"`);
    cambiosRealizados++;
    log(`✅ Mobile Responsive actualizado`, 'green');
} else {
    log(`⚠️  Mobile Responsive no encontrado o ya actualizado`, 'yellow');
}

// 3. Intersticial
const intersticialOriginal = /data-ad-slot="\[TU_ID_INTERSTICIAL\]"/;
if (contenido.match(intersticialOriginal)) {
    contenido = contenido.replace(intersticialOriginal, `data-ad-slot="${idIntersticial}"`);
    cambiosRealizados++;
    log(`✅ Intersticial actualizado`, 'green');
} else {
    log(`⚠️  Intersticial no encontrado o ya actualizado`, 'yellow');
}

// 4. In-Feed
const infeedOriginal = /data-ad-slot="\[TU_ID_INFEED\]"/;
if (contenido.match(infeedOriginal)) {
    contenido = contenido.replace(infeedOriginal, `data-ad-slot="${idInfeed}"`);
    cambiosRealizados++;
    log(`✅ In-Feed actualizado`, 'green');
} else {
    log(`⚠️  In-Feed no encontrado o ya actualizado`, 'yellow');
}

// Crear backup del archivo original
const backupNombre = `index.backup.${Date.now()}.html`;
fs.writeFileSync(backupNombre, fs.readFileSync('index.html', 'utf8'));
log(`💾 Backup creado: ${backupNombre}`, 'blue');

// Guardar los cambios
fs.writeFileSync('index.html', contenido);

log('');
log('🎉 ACTUALIZACIÓN COMPLETADA', 'green');
log('=========================', 'green');
log('');
log(`✅ Se realizaron ${cambiosRealizados} cambios exitosamente`);
log('');
log('📋 Próximos pasos:', 'blue');
log('1. Abre index.html en tu navegador', 'cyan');
log('2. Verifica que los anuncios se carguen correctamente', 'cyan');
log('3. Si tienes problemas, revisa la consola del navegador (F12)', 'cyan');
log('4. ¡Listo para monetizar tu conversor!', 'cyan');
log('');
log('🔗 Recursos útiles:', 'blue');
log('• Abre configurar-adsense.html para ver la guía completa', 'cyan');
log('• Lee MONETIZACION_GUIDE.md para más detalles', 'cyan');
log('• Tu ID de editor: ca-pub-1913399723778376', 'cyan');
log('');
log('💰 ¡Éxito con tu monetización!', 'green');

// Función para mostrar ayuda
function mostrarAyuda() {
    log('📖 AYUDA - ACTUALIZADOR DE IDS DE ADSENSE', 'cyan');
    log('========================================', 'cyan');
    log('');
    log('🎯 ¿Qué hace este script?', 'blue');
    log('Actualiza automáticamente los IDs de anuncios temporales en index.html', 'white');
    log('');
    log('📋 PASOS PARA CONFIGURAR TUS ANUNCIOS:', 'yellow');
    log('');
    log('1. Crea los anuncios en Google AdSense:', 'green');
    log('   • Conversor_Banner_Lateral (160×600)', 'white');
    log('   • Conversor_Mobile_Responsive (responsive)', 'white');
    log('   • Conversor_Intersticial (fluid)', 'white');
    log('   • Conversor_InFeed (fluid)', 'white');
    log('');
    log('2. Copia los IDs de cada anuncio de AdSense', 'green');
    log('');
    log('3. Ejecuta este script con los IDs:', 'green');
    log('   node actualizar-ids.js [id_lateral] [id_mobile] [id_intersticial] [id_infeed]', 'cyan');
    log('');
    log('💡 EJEMPLO:', 'yellow');
    log('node actualizar-ids.js 2345678901 3456789012 4567890123 5678901234', 'cyan');
    log('');
    log('🔒 SEGURIDAD:', 'red');
    log('• Siempre se crea un backup antes de cambiar', 'white');
    log('• Los cambios son reversibles', 'white');
    log('• Verifica en tu navegador después de actualizar', 'white');
    log('');
    log('🆘 SI NO FUNCIONA:', 'red');
    log('• Asegúrate de estar en la carpeta correcta', 'white');
    log('• Verifica que index.html exista', 'white');
    log('• Comprueba que los IDs tengan el formato correcto', 'white');
    log('• Revisa la consola del navegador (F12)', 'white');
}