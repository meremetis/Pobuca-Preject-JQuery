// ********************************** DOCUMENT ********************************** //

$(document).ready(function() {
    setTimeout(function() {
        $('.loader').fadeOut(1000);
        $('.content').fadeIn(1000);
        menuButtonCustomers();
        menuButtonProducts();
        menuButtonUsers();
        menuButtonLogo();
    }, 3000);
})

// ********************************** LOGO ********************************** //



function menuButtonLogo() {

    $(".imgLogo").on('click', function() {


        $('.customers').css({
            'color': 'var(--black)'
        })
        $('.products').css({
            'color': 'var(--black)'
        })
        $('.users').css({
            'color': 'var(--black)'
        })


        $(".title").html("Welcome");


        // hide delete button //
        $(".deleteButton").css({
            'display': 'none'
        })
        // hide addnew button //
        $(".addNewButton").css({
            'display': 'none'
        })
        // hide create button //
        $(".createButton").css("display", "none");
        // hide arrow button //
        $(".arrow-container").css("display", "none");
        // hide form  //
        $(".createUserForm").css("display", "none");

        // data calling //
        getWelcome();
    })
}

// ********************************** CUSTOMERS ********************************** //
function menuButtonCustomers() {

    $(".customers").on('click', function() {

        $(".dataTable").css("display", "block");
        $('.products').css({
            'color': 'var(--black)'
        })
        $('.users').css({
            'color': 'var(--black)'
        })
        $(this).css({
            'color': 'var(--blue)'
        })
        $(".title").html("Customers");

        // hide delete button //
        $(".deleteButton").css({
            'display': 'none'
        })
        // hide addnew button //
        $(".addNewButton").css({
            'display': 'none'
        })
        // hide create button //
        $(".createButton").css("display", "none");
        // hide arrow button //
        $(".arrow-container").css("display", "none");
        // hide form  //
        $(".createUserForm").css("display", "none");

        // data calling //
        getCustomers();
    })
}

function getCustomers() {
    $.ajax({
        url: 'data/customers.json', //kalw to link tou server
        type: 'get', // dilonw ti tipou klish einai
        dataType: 'JSON', // anaferw ti tupou dedomena tha einai
        beforeSend: function() {
            $('.loader-line').css("display", "block");
            $('.dataTable').css("display", "none")
        },
    }).done(function(response) { //afu ginei trexei to function pernane ta data apo to response
        setTimeout(function() {
            $('.loader-line').fadeOut(500);
            $('.dataTable').fadeIn(500);


        }, 1000);
        //tableBuilder(data.data);//pernaw ta data kai kalw thn function gia na ganei build ton table
        console.log(response); //kai edw emfanizw
        tableBuilderCustomers(response);
    })
}

function tableBuilderCustomers(data) {
    $("#tbody").empty();

    let text = '<tr> <th>CODE</th><th>NAME</th><th>ADDRESS</th></tr>';
    var dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
        let code = data[i].code;
        let name = data[i].name;
        let address = data[i].address;

        text +=
            `
        <tr class="table-row" >
            <td>${code}</td>
            <td>${name}</td>
            <td>${address}</td>
        </tr>    
        `
    }

    $("#tbody").append(text);
}

// ********************************** PRODUCTS ********************************** //


function menuButtonProducts() {

    $(".products").on('click', function() {

        $(".dataTable").css("display", "block");
        $('.customers').css({
            'color': 'var(--black)'
        })
        $('.users').css({
            'color': 'var(--black)'
        })
        $(this).css({
            'color': 'var(--blue)'
        })
        $(".title").html("Products");

        // show delete button //
        $(".deleteButton").css({
            'display': 'block'
        })
        // hide addnew button //
        $(".addNewButton").css({
            'display': 'none'
        })
        // hide create button //
        $(".createButton").css("display", "none");
        // hide arrow button //
        $(".arrow-container").css("display", "none");
        // hide form  //
        $(".createUserForm").css("display", "none");
        // data calling //
        getProducts()

    })
}


function getProducts() {
    $.ajax({
        url: 'data/products.json', //kalw to link tou server
        type: 'get', // dilonw ti tipou klish einai
        dataType: 'JSON', // anaferw ti tupou dedomena tha einai
        beforeSend: function() {
            $('.loader-line').css("display", "block");
            $('.dataTable').css("display", "none")
        },
    }).done(function(response) { //afu ginei trexei to function pernane ta data apo to response
        setTimeout(function() {
            $('.loader-line').fadeOut(500);
            $('.dataTable').fadeIn(500);
        }, 1000);
        //tableBuilder(data.data);//pernaw ta data kai kalw thn function gia na ganei build ton table
        console.log(response); //kai edw emfanizw
        tableBuilderProducts(response);
        menuButtonDelete(response);
    })
}



function menuButtonDelete(data) {

    $(".deleteButton").unbind().on('click', function() {
        let arrData = data;
        console.log("edw", arrData);


        var arrOfCheckedValues = [];
        $.each($("input[name='checkbox']:checked"), function() {
            arrOfCheckedValues.push($(this).val());
        });

        console.log("delete button")
        console.log(arrOfCheckedValues)

        if (arrOfCheckedValues.length < 1) {
            alert("Please choose one product");
        }

        if (arrOfCheckedValues.length > 1) {
            alert("Please choose only one product");
        }

        if (arrOfCheckedValues.length === 1) {
            let deleteValueIndex = arrOfCheckedValues[0];

            var response = confirm("Are you sure you want to delete this product?");
            console.log(response);

            if (response) {
                let deletedAr = arrData.splice(deleteValueIndex, 1);
                console.log("diagrameno adikimeno ", deletedAr[0]);
                console.log("pinakas dedomenwn", arrData);

                let objDeleted = deletedAr[0];
                let objString = JSON.stringify(objDeleted);
                sessionStorage.setItem(`productDeleted`, objString);


                // //storage show//
                // let item = JSON.parse( sessionStorage.getItem('productDeleted'));
                // console.log(item.code);
                // console.log(item.description);

                tableBuilderProducts(arrData);
            } else {
                console.log("delete is canceled");
            }
        }
    })
}


function tableBuilderProducts(data) {
    $("#tbody").empty();

    let text = '<tr> <th></th><th>CODE</th><th>DESCRIPTION</th></tr>';
    let productData = data;
    var dataLength = productData.length;

    for (let i = 0; i < dataLength; i++) {
        let code = data[i].code;
        let description = data[i].description;


        text +=
            `
        <tr class="table-row" id="row${i}">
            <td> <input class="deleteCheckbox" name="checkbox" onchange="checkedFunction(this)"  type="checkbox" id="pro${i}" value="${i}" name="Products"></input> </td>
            <td id=productCode${i}>${code}</td>
            <td id=productDescription${i}>${description}</td>
        </tr>    
        `
    }
    $("#tbody").append(text);
}

// ********************************** USERS ********************************** //


function menuButtonUsers() {

    $(".users").on('click', function() {
        $(".dataTable").css("display", "block");
        $('.customers').css({
            'color': 'var(--black)'
        })
        $('.products').css({
            'color': 'var(--black)'
        })
        $(this).css({
            'color': 'var(--blue)'
        })
        $(".title").html("Users");


        // hide delete button //
        $(".deleteButton").css({
            'display': 'none'
        })
        // show addnew button //
        $(".addNewButton").css({
            'display': 'block'
        })
        // hide create button //
        $(".createButton").css("display", "none");
        // hide arrow button //
        $(".arrow-container").css("display", "none");
        // hide form  //
        $(".createUserForm").css("display", "none");

        // data calling //
        getUsers()

        console.log("button users")

    })
}


function getUsers() {

    $.ajax({
        url: 'data/users.json', //kalw to link tou server
        type: 'get', // dilonw ti tipou klish einai
        dataType: 'JSON', // anaferw ti tupou dedomena tha einai
        beforeSend: function() {
            $('.loader-line').css("display", "block");
            $('.dataTable').css("display", "none")
        },
    }).done(function(response) { //afu ginei trexei to function pernane ta data apo to response
        setTimeout(function() {
            $('.loader-line').fadeOut(500);
            $('.dataTable').fadeIn(500);
        }, 1000);
        //tableBuilder(data.data);//pernaw ta data kai kalw thn function gia na ganei build ton table
        console.log("getData: ", response); //kai edw emfanizw
        // tableBuilderUsers(response);
        // menuButtonAddNew(response);
        console.log("get users")
        let updatedUsersExist = sessionStorage.getItem("updatedUsers");
        if (updatedUsersExist) {
            updatedUsersExist = JSON.parse(updatedUsersExist);
            console.log("users exist")
            tableBuilderUsers(updatedUsersExist);
            menuButtonAddNew(updatedUsersExist);

        } else {
            console.log("users dont exist ")
            tableBuilderUsers(response);
            menuButtonAddNew(response);

        }
        console.log(updatedUsersExist);
    })

}

function menuButtonAddNew(data) {
    let usersData = data;
    $(".addNewButton").on('click', function() {
        $(".title").html("Add new user");
        $(".dataTable").css("display", "none");

        $(".createUserForm").css("display", "block");
        $(".addNewButton").css("display", "none");
        $(".createButton").css("display", "block");
        $(".arrow-container").css("display", "block");
        menuButtonArrow();
        menuButtonCreate(usersData)
        console.log("add new function button")
    })


}



function menuButtonCreate(data) {

    let usersData = data;

    $(".createButton").unbind().on('click', function() {



        console.log("menu button create")

        console.log("create button data", usersData);

        let userName = $("#userName").val();
        let userCode = $("#userCode").val();

        console.log(`username : ${userName.length} usercode : ${userCode}`);

        if ((userName.length == 0) || (userCode.length == 0)) {

            if ((userName.length == 0) && (userCode.length == 0)) {
                alert("All fields are required!");
            } else if (userName.length == 0) {
                alert("Name is required");
            } else if (userCode.length == 0) {
                alert("Code is required");
            }


        } else {

            alert("correct");

            let userObj = {
                "code": userCode,
                "name": userName
            }
            usersData.unshift(userObj);

            tableBuilderUsers(usersData);

            $(".arrow-container").css("display", "none");
            $(".addNewButton").css("display", "block");
            $(".createButton").css("display", "none");
            $(".dataTable").css("display", "block");
            $(".createUserForm").css("display", "none");

            sessionStorage.setItem("updatedUsers", JSON.stringify(usersData));
        }

    })

}


function menuButtonArrow() {


    $(".arrow-container").unbind().on('click', function() {
        console.log("pressed back button");
        $(".dataTable").css("display", "block");
        $('.customers').css({
            'color': 'var(--black)'
        })
        $('.products').css({
            'color': 'var(--black)'
        })
        $(this).css({
            'color': 'var(--blue)'
        })
        $(".title").html("Users");


        // hide delete button //
        $(".deleteButton").css({
            'display': 'none'
        })
        // show addnew button //
        $(".addNewButton").css({
            'display': 'block'
        })
        // hide create button //
        $(".createButton").css("display", "none");
        // hide arrow button //
        $(".arrow-container").css("display", "none");
        // hide form  //
        $(".createUserForm").css("display", "none");

        // data calling //
        // getUsers() 

        console.log("menu button arow")
    })

}

function tableBuilderUsers(data) {
    console.log("users builder ")
    $("#tbody").empty();

    let text = '<tr> <th>CODE</th><th>NAME</th></tr>';
    var dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
        let code = data[i].code;
        let name = data[i].name;


        text +=
            `
        <tr class="table-row">
            <td>${code}</td>
            <td>${name}</td>
        </tr>    
        `
    }
    $("#tbody").append(text);
}

// ********************************** UTILITY ********************************** //


function getWelcome() {
    $("#tbody").empty();
}


function checkedFunction(a) {
    if (a.checked) {
        $(`#row${a.value}`).css('background-color', "var(--grey)")
    } else {
        $(`#row${a.value}`).css('background-color', "white")
    }
    // $(this).val();
    console.log(a.value);
    console.log(a.checked);
    console.log("else lol");
}

setTimeout(function() {
    $('.loader-line').fadeOut(1000);
    $('.dataTable').fadeIn(1000);
}, 3000);
