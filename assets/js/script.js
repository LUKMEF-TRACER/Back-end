const items = $('#food-item');

let food_arr = [];

$('#food-items').on('change', function() {

    let val = $(this).val();

    showCategoryItems(val);
})

function showCategoryItems(item) {

    const url = 'http://localhost/nutrition/Nutrition/get_category_nutrients/' + item;

    console.log({ url })
    $.ajax({
        type: 'GET',
        url,
        success: function(res) {
            fd = JSON.parse(res);
            console.log({ fd });

            let fd_items = [];
            $('#food-item').html('');
            for (let i = 0; i < fd.length; i++) {

                console.log({ id: fd[i], item });

                //if (fd[i].category === item) {
                fd_items.push((fd[i].name));

                $('#food-item').append(`<div id='${ (fd[i].id) }' class='fd-list list' ><item-list>${ (fd[i].name) } </item-list> <span><button class='btn btn-success add-me'>Add</button> | <button class='btn btn-danger remove-me'>Remove</button> </span></div>`);

                //}

            }

            // add or remove items
            $('.fd-list .add-me').on('click', handleItem);
            $('.fd-list .remove-me').on('click', removeItem);

        }
    })


    /*    //return;
        let fd_items = [];
        $('#food-item').html('');
        for (let i = 0; i < fd.length; i++) {

            if (fd[i].category === item) {
                console.log({
                    item
                })
                fd_items.push((fd[i].name));

                $('#food-item').append(`<div id='${ (fd[i].id) }' class='fd-list list' ><item-list>${ (fd[i].name) } </item-list> <span><button class='btn btn-success add-me'>Add</button> | <button class='btn btn-danger remove-me'>Remove</button> </span></div>`);

            }

        }
    */

    function resolveUnit(obj) {
        /*if (obj.unit == 'ml') {
            return `<select class="form-control" name='item' id='item'>
                <option value='${obj.qty}'>Large bottle</option>
                <option value='700'>Medium bottle</option>
                <option value='330'>Small bottle</option>
                    
                </select>
            `

        } else if (obj.unit == 'mg') {
            return `<input type='number' class="form-control" name='item' value='${obj.qty}' id='item'>`
        }*/
        return `<input type='number' class="form-control" name='item' value='${obj.qty}' id='item'>`;
    }

    function handleItem(evt) {
        //console.log({ evt })
        evt.preventDefault();
        // check if class is present and present adding

        // 
        const fd_id = $(this).parent().parent().attr('id');
        const fd_name = $(this).parent().parent().find($('item')).text();

        let fd_data = fd.filter(x => x.id == fd_id);
        console.log({ fd_data });
        alert(JSON.stringify(fd_data));

        // populate modal
        $('#adding-food .modal-body').html('');
        $('#adding-food .modal-body').html(`<div class="form-group">
                        <label for="item">Item</label>
                        ${resolveUnit(fd_data[0])}
                        <!--input type='number' class="form-control" name='item' value='${fd_data[0].qty}' id='item'-->
                        <item> <span>${fd_data[0].qty}</span>${fd_data[0].unit} of ${fd_data[0].name} </item>
                        
                    </div>`)

        //$('#item').val( fd_data[0].qty )
        //$('item').html( `<span>${fd_data[0].qty}</span>${fd_data[0].unit} of ${fd_data[0].name}` )

        $('#item').on('keyup', function() {
            let val = $('#item').val();

            $('item').html(`<span>${val}</span>${fd_data[0].unit} of ${fd_data[0].name}`)
        })


        $('#adding-food').modal('show');
        $('#adding-food').on('shown.bs.modal', function() {
            //alert(JSON.stringify(fd_data));
        });

        console.log({ fd_data });

        $('#add-new-item').on('click', function() {
            //alert(JSON.stringify(fd_data))
            console.log({ dataInput: fd_data })
            if (fd_data) {
                alert(JSON.stringify(fd_data));
                resolveNewSize(fd_data);
                fd_data = null;
            }


        });



    }

    function removeItem(evt) {
        evt.preventDefault();
        console.log({
            food_arr
        });

        const fd_id = $(this).parent().parent().attr('id');
        const fd_name = $(this).parent().parent().find($('item')).text();

        for (let i = 0; i < food_arr.length; i++) {
            if (food_arr[i].id === fd_id) {
                delete food_arr[i];
            }
        }
        food_arr = food_arr.filter(x => typeof x !== 'undefined');

        const props_arr = food_arr.map(x => x.props);

        console.log({
            props_arr
        });

        // reduce and sum
        getVals(props_arr, 'add');

        //const con = $(this).parent().parent().removeClass('added');

        // DOM
        display_chosen_food(food_arr);

    }

}

function resolveNewSize(fd_datum) {
    $('#adding-food').modal('hide');
    $('#adding-food').on('hidden', function() {
        $(this).data('modal', null);
    });

    console.log({ fd_datum, new: $('#item').val(), old: fd_datum[0].qty });

    // newSizeIndex = new/old
    let newSizeIndex = ($('#item').val() / fd_datum[0].qty).toFixed(2);
    alert(JSON.stringify(fd_datum));
    console.log({ action: 'Hiding modal', fd_datum, newSizeIndex })
    for (let vals in fd_datum[0].props) {
        console.log({ vals });
        fd_datum[0].props[vals] = (Number(fd_datum[0].props[vals]) * newSizeIndex).toFixed(2);
    }

    console.log({ fd_datum })
        //return false;

    food_arr.push(...fd_datum);
    const props_arr = food_arr.map(x => x.props);

    fd_datum = [];

    console.log({
        fd_datum,
        props_arr
    });

    // reduce and sum
    //getVals(fd[fd_id], 'add');
    getVals(props_arr, 'add');

    //CSS
    //const con = $(this).parent().parent().addClass('added');

    //$('#result-items').append(`<h3> ${ fd_name } </h3>`);

    display_chosen_food(food_arr);

    console.log({
        food_arr
    });

}

//console.log({ fd_items });

//$('#food-item').append('')

//fd.map( x => items.appendChild(`${x}`));

const valsAcc = [];

function plot_chart(data, dom = "food-chart") {
    document.getElementById(dom).innerHTML = '';
    //alert('Clean DIV')
    var ctx = document.getElementById(dom).getContext('2d');

    var chartData = [];
    var chartLabels = [];

    for (let i in data) {
        console.log({ index: i, val: data[i] })
        chartData.push(data[i]);
        chartLabels.push(i);
    }
    console.log({ chartData, chartLabels })
    var colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(205, 106, 186, 0.8)',
        'rgba(245, 146, 106, 0.8)',
    ];

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: colors,
                borderWidth: 2
            }]
        },

    });
}

function getVals(val, action = 'none') {

    //valsAcc.push(vals);
    console.log({
        val
    });

    //let res = valsAcc.reduce( fd_sum );
    let res;
    if (val.length > 0) {

        $('#results, #food-chart, #result-items').css('display', 'block');
        res = val.reduce(fd_sum);
        console.log({
            res,
            action
        });

        plot_chart(res);
        //document.getElementById('results').innerHTML = JSON.stringify(res);
        //$('#results').html(`<button id='prep' class='btn btn-sm btn-info'>PREP</button> `);

        $('#results').html(`
                        <h3 class='text-center'>Report Before Cooking</h3>
						<table id='food-raw' class='table table-bordered table-striped'>
							<caption class='table-caption'><button id='prep' class='btn btn-block btn-sm btn-success'>PREPARATION</button> </caption>
							<thead>
								<tr>
									<th>Nutritional Parameter</th>
									<th>Nutritional Content</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					`);

        for (let k in res) {
            $('#food-raw tbody').append(`<tr><th>${k}</th><td>${res[k]}</td></tr>`)
        }
        //${JSON.stringify(res)}



        //$('#results table').html(td);

    } else {
        $('#results, #food-chart, #result-items').css('display', 'none'); //html('');

    }

    $('#prep').on('click', function() {

        $('.cooking-items').html('')
        food_arr.map(function(x) {
            $('.cooking-items').append(`<div>${x.name}</div>`)
        })
        $('#prepare-food').modal();

        $('#cook-now').on('click', function() {

            cooking_method = $('#cooking-method').val();
            let index;
            let cooking = {};
            if (cooking_method == 'Nothing') {
                index = 1;
                console.log('Nothing');
            } else if (cooking_method == 'Boiling') {
                index = 0.25;
                console.log('Boiling');
            } else if (cooking_method == 'Frying') {
                index = 0.5;
                console.log('Frying');
            } else if (cooking_method == 'Roasting') {
                index = 0.75;
                console.log('roasting');
            } else if (cooking_method == 'Fermenting') {
                index = 1.25;
                console.log('roasting');
            }

            for (let k in res) {
                //console.log(k, res[k])
                cooking[k] = res[k] * index;
            }
            /** CHART **/
            //$('canvas').css('display', 'block');
            //$('#result-items').prepend(`<canvas id='food-chart'></canvas>`);

            plot_chart(cooking);
            /*
                        var ctx = document.getElementById("food-chart").getContext('2d');

                        var chartData = [];
                        var chartLabels = [];

                        for (let i in cooking) {
                            console.log({ index: i, val: cooking[i] })
                            chartData.push(cooking[i]);
                            chartLabels.push(i);
                        }
                        console.log({ chartData, chartLabels })
                        var colors = [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(205, 106, 186, 0.8)',
                            'rgba(245, 146, 106, 0.8)',
                        ];

                        var myChart = new Chart(ctx, {
                            type: 'pie',
                            data: {
                                labels: chartLabels,
                                datasets: [{
                                    data: chartData,
                                    backgroundColor: colors,
                                    borderWidth: 2
                                }]
                            },

                        });
            */
            /** CHART **/
            $('#prepare-food').modal('hide');
            //let content = ;
            let timing = $('#timing').val();
            let serving = $('#serving').val();
            let recipe = $('#name').val();
            let food_items = food_arr.map(x => x.name);

            $('#result-items').css('height', '500px');

            $('#result-items').html(`
                                    <h3 class='text-center'>Report After Cooking</h3>
                                    
                                    <table class='table table-bordered table-striped'>
                                        <tr>
                                            <th>Cooking Method</th> <td>${cooking_method}</td>
                                        </tr><tr>
                                            <th>Timing</th> <td>${timing}</td>
                                        </tr><tr>
                                            <th>Serving</th> <td>${serving}</td>
                                        </tr>
                                    </table>
                                    <!--div>Recipe Items: ${JSON.stringify(food_items)}</div-->
                                    <div>Items: ${ food_items.join(', ')}</div>
                                    
                                    <h3>Nutritional Content of recipe</h3>
                                    <hr>
                                    <div>
										<table class='table table-striped table-bordered nutri-content'>
											<thead><th>Nutritional parameter</th><th>Nutritional Content</th></thead>
											<tbody></tbody>
										</table>
									</div>
                                    
                                `);

            for (let k in cooking) {
                $('.nutri-content tbody').append(`<tr><th>${k}</th><td>${cooking[k]}</td></tr>`)
            }

            const food_data_obj = {
                food_id: new Date().getTime(),
                meal_name: recipe,
                cooking_method,
                timing,
                serving,
                food_items,
                ingredients: food_arr,
                props_raw: res,
                props_cooked: cooking,
            }
            console.log({
                food_data_obj,
                json: JSON.stringify(food_data_obj)
            });

            // send to recipe form 
            $('#recipe-calc').val(food_data_obj);

            let food_data = [];
            if (localStorage.getItem('food_data')) {
                let food_datum = JSON.parse(localStorage.getItem('food_data'));
                food_data.push(food_datum, food_data_obj);

            } //else{
            localStorage.setItem('food_data', JSON.stringify(food_data_obj))
                //}

            var url = 'http://localhost/nutrition/Nutrient_calc/add_nutrient'; //"<?php echo base_url(); ?>Nutrient_calc/add_nutrient";
            var data = { myVals: JSON.stringify(food_data_obj) };

            console.log({ data, url });
            /*
                        $.ajax({
                            type: "POST",
                            url,
                            data,
                            contentType: "application/json; charset=utf-8",
                            traditional: true,
                            success: function(res) {

                                console.log({ url, res });

                            }
                        })
            */

            console.log({ val: localStorage.getItem('food_data') });


        })
    })

}


function fd_sum(obj, acc = 0) {
    let sum = {};

    Object.keys(obj).forEach(key => {
        if (acc.hasOwnProperty(key)) {
            sum[key] = Number(obj[key]) + Number(acc[key])
        } else {
            sum[key] = obj[key];
        }
    })
    return sum;
}

function display_chosen_food(food_arr) {
    $('#result-items').html('').css('display', 'block');
    food_arr.map(function(x) {
        //$('#result-items').append(`<div id='${x.id}' class='list'> <span>${ x.name } </span> </div>`);
        $('#results').prepend(`<div id='${x.id}' class='btn btn-info btn-sm' style='margin:0 5px 0 0;'> <span>${ x.name } </span> </div>`);

    });

}