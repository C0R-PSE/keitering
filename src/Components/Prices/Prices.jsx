import React from 'react'
import './Prices.css'

const crash_menu_data = {
    "шахта": {
        options: [
            { price: 1700 }
        ]
    },
    "калауд": {
        options: [
            { price: 350 }
        ]
    },
    "колба": {
        options: [
            { price: 700 }
        ]
    },
    "шланг мундштук": {
        options: [
            { price: 900 }
        ]
    },
    "уплотнитель": {
        options: [
            { price: 50 }
        ]
    },
    "шайба для блюдца": {
        options: [
            { price: 50 }
        ]
    },
    "блюдце": {
        options: [
            { price: 500 }
        ]
    }
}
const tariffs = {
    "кальян": {
        options: [
            { price: 150, time: 1 },
            { price: 600, time: 24 }
        ]
    },
    "кальян (полный комплект)": {
        options: [
            { price: 1100, time: 24 }
        ]
    },
    "кальянный мастер": {
        options: [
            { price: 2900, time: 2 },
            { price: 6900, time: 6 }
        ]
    }
}

function PriceList({price_data}) {
    const price_list = []
    for (let pos in price_data) {
        const options = price_data[pos].options.sort((a, b) => a.time - b.time);
        const limits = (options.length > 1) 
            ? options.map((option, i, options) => // option = options[i]
                (i < options.length - 1) 
                    ? Math.ceil(options[i + 1].price / options[i].price * options[i].time)
                    : null
            )
            : []
        for (let option in options) {
            const price = options[option].price / ((options[option].time < 24) 
                ? options[option].time
                : 1)
            const time = (options[option].time) 
                ?(options[option].time < 24) 
                    ? 'час' 
                    : 'сутки' 
                : null
            var price_output = ''
            price_output += (limits.length > 0) // limit
                ?((option === 0)
                    ? 'до ' + limits[option]
                    :(option < options.length - 1)
                    ? 'от ' + limits[option - 1] + ' до ' + limits[option]
                    : 'от ' + limits[option - 1])
                  + ' часов: '
                : ''
            price_output += price + " руб"      // price
            price_output += (time) ? '/' + time : ''
            /*(time == 24)        
                ? '/сутки'
                :(Math.trunc(time % 20) == 1)
                ? '/час'
                :(time % 20 >= 2 && time % 20 <= 4)
                ? '/' + time + ' часа'
                :(time % 20 >= 5 && time % 20 < 20  || Math.trunc(time == 20))
                ? '/' + time + ' часов'
                : ''*/


            price_list.push(
              <div key={pos + '_' + option} className="price_list_row">
                {(option === 0) 
                  ? <div className='position'>{pos[0].toUpperCase() + pos.slice(1)}</div>
                  : null}
                <div className='price'>{price_output}</div>
              </div>
            )
        }
    }
    return(
        <div className='price_list'>{price_list}</div>
    )
}

function Prices() {

    return(
      <>
        <div className='price_list_block'>
            <div className='heading'>Услуги и Тарифы</div>
            <PriceList price_data={tariffs} />
        </div>
        <div className='price_list_block'>
            <div className='heading'>В залог входят:</div>
            <PriceList price_data={crash_menu_data} />
        </div>
      </>
    )
}

export default Prices