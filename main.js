$(function() {
    //get students data
    $('#get').on('click', function() {
        $.ajax({
            url: '/student',
            contentType: 'application/json',
            success: (res) => {
                var tbody = $('#get-body');
                tbody.html('');

                res.students.forEach(student => {
                    tbody.append(`
                        <tr>
                            <td class="id">${student.id}</td>
                            <td><input type="number" class="roll" value=${student.roll}></td>
                            <td><input type="string" class="name" value=${student.name}></td>
                            <td>${student.dept}</td>
                            <td><button type="button" class="update">Update</button></td>
                            <td><button class="delete">Delete</button></td>
                        </tr>
                    `)
                });
            }
        })
    })

    //post students data
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var roll = $('#create-roll');
        var name = $('#create-name');
        var dept = $('#create-dept');

        $.ajax({
            url: '/student',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 
                roll: roll.val(),
                name: name.val(), 
                dept: dept.val()
            }),
            
            success: (res) => {
                if(res.status === 400){
                    alert(res.msg);
                    $('#get').click();
                }else{
                    alert(res.msg);
                    roll.val('');
                    name.val('');
                    dept.val('');
                    $('#get').click();
                }
            }
        });
    });

    //update students data
    $('#get-table').on('click', '.update', function () {
        var row = $(this).closest('tr');
        var id = row.find('.id').text();
        var newRoll = row.find('.roll').val();
        var newName = row.find('.name').val();

        $.ajax({
            url: '/student/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                newRoll,  
                newName 
            }),

            success: function(res) {
                $('#get').click();
            }
        });
    });

    //delete student
    $('#get-table').on('click', '.delete', function() {
        var row = $(this).closest('tr');
        var id = row.find('.id').text();

        $.ajax({
            url: '/students/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(res) {
                console.log(res);
                $('#get').click();
            }
        });
    });

    //search student by roll no
    $('#roll-form').on('submit', function(event) {
        event.preventDefault();
        
        var roll = $('#search-by-roll').val();

        $.ajax({
            url: '/searchbyroll/' + roll,
            method: 'GET',
            contentType: 'application/json',

            success: function(res) {
                var tbody = $('#search-roll-body');
                tbody.html(`
                    <tr>
                        <td class="id">${res.student.id}</td>
                        <td>${res.student.roll}</td>
                        <td>${res.student.name}</td>
                        <td>${res.student.dept}</td>
                    </tr>
                `)
            }
        });
    })

    $('#roll-form').on('input', function(event) {
        event.preventDefault();
    
        var a;
        var roll = $('#search-by-roll').val();

        $.ajax({
            url: '/specificroll/' + roll,
            method: 'GET',
            contentType: 'application/json',

            success: (res) => {
                a = $("#showroll")
                a.html('');

                res.search.forEach(student => {
                    a.append(`
                        <button class="selectroll">${student.roll}</button><br>
                    `)
                })

                $('.selectroll').on('click', function(){
                    var roll = $(this).html();
                    
                    $.ajax({
                        url: '/searchbyroll/' + roll,
                        method: 'GET',
                        contentType: 'application/json',
            
                        success: function(res) {
                            var tbody = $('#search-roll-body');
                            tbody.html(`
                                <tr>
                                    <td class="id">${res.student.id}</td>
                                    <td>${res.student.roll}</td>
                                    <td>${res.student.name}</td>
                                    <td>${res.student.dept}</td>
                                </tr>
                            `)
                        }
                    });    
                })
            }
        });
    })

    //search student by name
    $('#name-form').on('submit', function(event) {
        event.preventDefault();

        var name = $('#search-by-name').val();

        $.ajax({
            url: '/searchbyname/' + name,
            method: 'GET',
            contentType: 'application/json',

            success: (res) => {
                console.log(res);
                var tbody = $('#search-name-body');
                tbody.html(`
                    <tr>
                        <td class="id">${res.student.id}</td>
                        <td>${res.student.roll}</td>
                        <td>${res.student.name}</td>
                        <td>${res.student.dept}</td>
                    </tr>
                `)
            }
        });
    });

    $('#name-form').on('input', function(event) {
        event.preventDefault();

        var name = $('#search-by-name').val();      
        var b;

        $.ajax({
            url: '/specificname/' + name,
            method: 'GET',
            contentType: 'application/json',

            success: (res) => {
                b = $("#showname")
                b.html('');

                res.search.forEach(student => {
                    b.append(`
                        <button class="selectname">${student.name}</button><br>
                    `)
                })

                $('.selectname').on('click', function(){
                    var name = $(this).html();
                    console.log(name);
                    $.ajax({
                        url: '/searchbyname/' + name,
                        method: 'GET',
                        contentType: 'application/json',
            
                        success: function(res) {
                            var tbody = $('#search-name-body');
                            tbody.html(`
                                <tr>
                                    <td class="id">${res.student.id}</td>
                                    <td>${res.student.roll}</td>
                                    <td>${res.student.name}</td>
                                    <td>${res.student.dept}</td>
                                </tr>
                            `)
                        }
                    });    
                })
            }
        });
    })
});