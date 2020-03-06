// @flow
/* eslint-disable quotes */

const jsonOfXml = require('./json-of-xml')

test('basic', async () => {
  expect(jsonOfXml('<foo />')).toMatchObject({})
  expect(jsonOfXml('<foo  bar="baz"/>')).toMatchObject({ _bar: 'baz' })
  expect(jsonOfXml('<foo><ns:bar baz="1" /></foo>')).toMatchObject({ bar: { _baz: '1' } })
})

test('complex', async () => {
  expect(jsonOfXml(`
    <catalog>
       <product description="Cardigan Sweater" product_image="cardigan.jpg">
       <catalog_item gender="Men's">
          <item_number>QWZ5671</item_number>
          <price>39.95</price>
          <size description="Medium">
             <color_swatch image="red_cardigan.jpg">Red</color_swatch>
             <color_swatch image="burgundy_cardigan.jpg">Burgundy</color_swatch>
          </size>
          <size description="Large">
             <color_swatch image="red_cardigan.jpg">Red</color_swatch>
             <color_swatch image="burgundy_cardigan.jpg">Burgundy</color_swatch>
          </size>
       </catalog_item>
       <catalog_item gender="Women's">
          <item_number>RRX9856</item_number>
          <price>42.50</price>
          <size description="Small">
             <color_swatch image="red_cardigan.jpg">Red</color_swatch>
             <color_swatch image="navy_cardigan.jpg">Navy</color_swatch>
             <color_swatch image="burgundy_cardigan.jpg">Burgundy</color_swatch>
          </size>
          <size description="Medium">
             <color_swatch image="red_cardigan.jpg">Red</color_swatch>
             <color_swatch image="navy_cardigan.jpg">Navy</color_swatch>
             <color_swatch image="burgundy_cardigan.jpg">Burgundy</color_swatch>
             <color_swatch image="black_cardigan.jpg">Black</color_swatch>
          </size>
          <size description="Large">
             <color_swatch image="navy_cardigan.jpg">Navy</color_swatch>
             <color_swatch image="black_cardigan.jpg">Black</color_swatch>
          </size>
          <size description="Extra Large">
             <color_swatch image="burgundy_cardigan.jpg">Burgundy</color_swatch>
             <color_swatch image="black_cardigan.jpg">Black</color_swatch>
          </size>
       </catalog_item>
     </product>
    </catalog>
  `)).toEqual({
    "product": {
      "_description": "Cardigan Sweater",
      "_product_image": "cardigan.jpg",
      "catalog_item": [
        {
          "_gender": "Men's",
          "item_number": {
            "_": "QWZ5671"
          },
          "price": {
            "_": "39.95"
          },
          "size": [
            {
              "_description": "Medium",
              "color_swatch": [
                {
                  "_": "Red",
                  "_image": "red_cardigan.jpg"
                },
                {
                  "_": "Burgundy",
                  "_image": "burgundy_cardigan.jpg"
                }
              ]
            },
            {
              "_description": "Large",
              "color_swatch": [
                {
                  "_": "Red",
                  "_image": "red_cardigan.jpg"
                },
                {
                  "_": "Burgundy",
                  "_image": "burgundy_cardigan.jpg"
                }
              ]
            }
          ]
        },
        {
          "_gender": "Women's",
          "item_number": {
            "_": "RRX9856"
          },
          "price": {
            "_": "42.50"
          },
          "size": [
            {
              "_description": "Small",
              "color_swatch": [
                {
                  "_": "Red",
                  "_image": "red_cardigan.jpg"
                },
                {
                  "_": "Navy",
                  "_image": "navy_cardigan.jpg"
                },
                {
                  "_": "Burgundy",
                  "_image": "burgundy_cardigan.jpg"
                }
              ]
            },
            {
              "_description": "Medium",
              "color_swatch": [
                {
                  "_": "Red",
                  "_image": "red_cardigan.jpg"
                },
                {
                  "_": "Navy",
                  "_image": "navy_cardigan.jpg"
                },
                {
                  "_": "Burgundy",
                  "_image": "burgundy_cardigan.jpg"
                },
                {
                  "_": "Black",
                  "_image": "black_cardigan.jpg"
                }
              ]
            },
            {
              "_description": "Large",
              "color_swatch": [
                {
                  "_": "Navy",
                  "_image": "navy_cardigan.jpg"
                },
                {
                  "_": "Black",
                  "_image": "black_cardigan.jpg"
                }
              ]
            },
            {
              "_description": "Extra Large",
              "color_swatch": [
                {
                  "_": "Burgundy",
                  "_image": "burgundy_cardigan.jpg"
                },
                {
                  "_": "Black",
                  "_image": "black_cardigan.jpg"
                }
              ]
            }
          ]
        }
      ]
    }
  })
})
