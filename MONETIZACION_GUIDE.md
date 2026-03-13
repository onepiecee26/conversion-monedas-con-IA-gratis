# 🚀 Guía de Configuración de AdSense para Conversor de Divisas

## 📋 Resumen Rápido

✅ **Estado actual**: Script de AdSense instalado con tu ID de editor: `ca-pub-1913399723778376`  
✅ **Banner superior**: Configurado con ID `1370663935`  
⏳ **Otros anuncios**: Pendientes de configurar con tus IDs reales  

## 🎯 Pasos para Activar la Monetización

### Paso 1: Abrir el Panel de Configuración
1. Abre el archivo `configurar-adsense.html` en tu navegador
2. Verás una guía interactiva paso a paso
3. Sigue los pasos numerados del 1 al 5

### Paso 2: Crear Unidades de Anuncios en AdSense

**Importante**: Necesitas crear 5 tipos de anuncios en tu cuenta de AdSense:

| Ubicación | Nombre Sugerido | Tamaño | Estado |
|-----------|----------------|---------|---------|
| Banner Superior | `Conversor_Banner_Superior` | 728×90 | ✅ Listo |
| Banner Lateral | `Conversor_Banner_Lateral` | 160×600 | ⏳ Pendiente |
| Móvil Responsive | `Conversor_Mobile_Responsive` | Responsive | ⏳ Pendiente |
| Intersticial | `Conversor_Intersticial` | Fluid | ⏳ Pendiente |
| In-Feed | `Conversor_InFeed` | Fluid | ⏳ Pendiente |

### Paso 3: Actualizar IDs en el Código

**Archivo**: `index.html`

Busca estos comentarios y actualiza los IDs:

```html
<!-- Banner Lateral -->
data-ad-slot="[TU_ID_LATERAL]" ➜ Reemplaza con tu ID real

<!-- Anuncio Móvil -->
data-ad-slot="[TU_ID_MOBILE]" ➜ Reemplaza con tu ID real  

<!-- Anuncio Intersticial -->
data-ad-slot="[TU_ID_INTERSTICIAL]" ➜ Reemplaza con tu ID real

<!-- Anuncio In-Feed -->
data-ad-slot="[TU_ID_INFEED]" ➜ Reemplaza con tu ID real
```

### Paso 4: Herramientas de Ayuda

#### Opción A: Usar el Script de Actualización
1. Abre `actualizar-adsense.js` en tu editor
2. Reemplaza los valores temporales con tus IDs reales:
   ```javascript
   bannerLateral: '1234567890',  // ⬅ Tu ID real aquí
   mobileResponsive: '2345678901',  // ⬅ Tu ID real aquí
   ```
3. Ejecuta las funciones en la consola del navegador

#### Opción B: Usar la Guía Visual
1. Abre `configurar-adsense.html`
2. Haz clic en "Configurar" en cada paso
3. Sigue las instrucciones detalladas

## 🔧 Ubicaciones de Anuncios en tu HTML

| Ubicación | Línea Aprox | Comentario a Buscar |
|-----------|-------------|----------------------|
| Header | ~45 | `<!-- Conversor_Banner_Superior -->` |
| Lateral Desktop | ~280 | `<!-- Banner Lateral -->` |
| Móvil Only | ~230 | `<!-- Anuncio Móvil -->` |
| Entre Secciones | ~150 | `<!-- Anuncio Intersticial -->` |
| In-Feed | ~320 | `<!-- Anuncio In-Feed -->` |

## 📊 IDs Sugeridas para tus Anuncios

Basado en tu ID de editor (`1913399723778376`), aquí tienes IDs sugeridas:

```
Banner Lateral: 19133997
Mobile Responsive: 19133998  
Intersticial: 19133999
In-Feed: 19134000
```

⚠️ **Importante**: Estas son sugerencias. Usa los IDs reales que te proporcione AdSense al crear los anuncios.

## 🎨 Tipos de Anuncios Implementados

### 1. Banner Superior (728×90)
- **Ubicación**: Arriba del contenido principal
- **Dispositivos**: Todos
- **Formato**: Display tradicional
- **Estado**: ✅ Configurado

### 2. Banner Lateral (160×600)
- **Ubicación**: Columna derecha, sticky
- **Dispositivos**: Solo desktop (≥1024px)
- **Formato**: Display vertical
- **Estado**: ⏳ Pendiente

### 3. Móvil Responsive
- **Ubicación**: Sección móvil del layout
- **Dispositivos**: Solo móvil (<768px)
- **Formato**: Responsive automático
- **Estado**: ⏳ Pendiente

### 4. Intersticial Fluid
- **Ubicación**: Entre conversión y gráficos
- **Dispositivos**: Todos
- **Formato**: Fluid (se adapta al contenedor)
- **Estado**: ⏳ Pendiente

### 5. In-Feed
- **Ubicación**: Integrado con el contenido
- **Dispositivos**: Todos
- **Formato**: Nativo/Fluid
- **Estado**: ⏳ Pendiente

## 🚀 Comandos Rápidos

### Verificar Estado
```javascript
verificarEstadoConfiguracion()
```

### Ver Instrucciones de Actualización
```javascript  
actualizarHTMLConIDs()
```

### Generar Código Completo
```javascript
generarCodigoCompleto()
```

## 📈 Optimización de Ingresos

### Mejores Prácticas
1. **CTR (Click-Through Rate)**: Objetivo 2-5%
2. **CPC (Costo por Click)**: Varía por país (USD: $0.50-2.00)
3. **RPM (Revenue per Mille)**: Objetivo $5-20

### Ubicaciones de Alto Rendimiento
1. **Above the fold**: Banner superior
2. **Content break**: Intersticial entre secciones
3. **Right rail**: Banner lateral (desktop)
4. **Mobile first**: Responsive para móvil

### Optimización Continua
- Revisar rendimiento mensualmente
- A/B test de posiciones
- Analizar métricas por país
- Ajustar según temporada

## 🔍 Solución de Problemas

### Anuncios No Aparecen
1. Verifica que AdSense esté aprobado
2. Comprueba los IDs de anuncios
3. Revisa la consola del navegador (F12)
4. Desactiva temporalmente AdBlock

### Rendimiento Bajo
1. Aumenta tráfico orgánico
2. Mejora la velocidad de carga
3. Optimiza para móvil
4. Considera otros formatos de anuncios

## 📞 Soporte

### Recursos de AdSense
- 📧 **Soporte de AdSense**: https://support.google.com/adsense
- 📞 **Teléfono**: +1-650-253-0000
- 💬 **Chat**: Disponible en el panel de AdSense

### Comunidad
- 🌐 **Foros de AdSense**: https://support.google.com/adsense/community
- 📚 **Documentación**: https://developers.google.com/adsense

## 🎉 Próximos Pasos

1. ✅ **Paso 1**: Crea los 4 anuncios restantes en AdSense
2. ✅ **Paso 2**: Actualiza los IDs en `index.html`
3. ✅ **Paso 3**: Prueba que los anuncios carguen correctamente
4. ✅ **Paso 4**: Monitorea el rendimiento semanalmente
5. ✅ **Paso 5**: Optimiza según los datos

---

**📊 Estado de Configuración**: `2/5` anuncios configurados (40%)  
**💰 Potencial de Ingresos**: $50-200/mes (con 10k visitas/mes)  
**⚡ Tiempo estimado de configuración**: 30-60 minutos  

¡Éxito con tu monetización! 🚀