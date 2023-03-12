require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",


    ],
    function(Map, MapView, FeatureLayer, Legend){

        let mapa = new Map({
            basemap: "dark-gray-vector"
        })

        let vista_mapa = new MapView({
            container:"divMap",
            map: mapa,
            center: [5.703, 50.417],
            zoom: 3
        })

        let demo_europe = new FeatureLayer({
          url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/Europe_NUTS_3_Demographics/FeatureServer",
        });

        mapa.add(demo_europe)

       let renderer = {

        type:'simple',

        symbol:{
            type: 'simple-fill',
            outline:{
                color:'lightgray',
                width:0
            }
        },

        label: 'GDP',
        visualVariables:[
            {
                type:'color',
                field:'GDP',
                stops:[
                    {
                        value: 100000, 
                        color: "#bf021b", 
                    },
                    {
                        value: 30000, 
                        color: "#ff00ee", 
                    },

                    {
                        value: 0, 
                        color: "#abf2ff", 
                    },
                ]
            }
        ]


       }

       demo_europe.renderer=renderer

        
        let leyenda = new Legend({
            view:vista_mapa,
            layerInfos: [
                {
                  layer: demo_europe,
                  title: "Demografía Europea"
                }]
        })

        leyenda.style = 'classic'

        vista_mapa.ui.add(leyenda,"bottom-left")
        
        let plantilla_popup = {
            title: "{NAME}",
            content: [
                {
                    type: "fields",
                    fieldInfos: [
                        {
                            fieldName: "GDP",
                            label: "PIB de la región"
                        },
                        {
                            fieldName: "POPULATION",
                            label: "Población de la región"
                        },
                        {
                            fieldName: "HOUSEHOLDS",
                            label: "Viviendas en la región"
                        }
                    ]
                },
                {
                    type:'media',
                    mediaInfos:[{
                        title: 'Distribución de cada grupo de edad en la población',
                        type:'pie-chart',
                        value:{
                            fields:['AGE_0_14','AGE_15_29','AGE_30_44','AGE_45_59','AGE_60_'],
                        }
                    }]
                }
            ]
        }

        demo_europe.popupTemplate = plantilla_popup
    }
)