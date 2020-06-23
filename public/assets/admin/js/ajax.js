$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$(document).ready(function(){
    $('.edit').click(function(){
        $('.error').hide();
        let id = $(this).data('id');
        // Edit
        $.ajax({
            url : 'admin/category/' + id + '/edit',
            dataType: 'json',
            type: 'get',
            success: function($result){
                $('.name').val($result.name);
                $('.title').text($result.name);
                if ($result.status==1) {
                    $('.ht').attr('selected','selected');
                } else {
                    $('.kht').attr('selected','selected');
                }
            }
        });
        $('.update').click(function() {
            let ten = $('.name').val();
            let status = $('.status').val();

            $.ajax({
                url : 'admin/category/'+id,
                data : {
                    name : ten,
                    status : status
                },
                dataType : 'json',
                type : 'put',
                success : function($result) {
                    if($result.error=='true'){
                        $('.error').show();
                        $('.error').html($result.message.name[0]);
                    } else {
                        toastr.success($result.success , 'Thông báo', {timeOut: 5000});
                        $('#edit').modal('hide');
                        location.reload();
                    }
                }
            });

        });

    });
    // delete category
    $('.delete').click(function(){
        let id = $(this).data('id');
        $('.del').click(function(){
            $.ajax({
                url :  'admin/category/'+id,
                data : 'json',
                type : 'DELETE',
                success : function($result){
                    toastr.success($result.success , 'Thông báo', {timeOut: 5000});
                    $('#delete').modal('hide');
                    location.reload();
                }

            });
        });
    });

    // Edit product type
    $('.editProducttype').click(function(){
        $('.error').hide();
        let id = $(this).data('id');
        $.ajax({
            url : 'admin/producttype/' + id + '/edit',
            dataType: 'json',
            type: 'get',
            success: function($result){
                $('.name').val($result.producttype.name);
                var html = '';
                $.each($result.category, function($key, $value){
                    if($value['id'] == $result.producttype.idCategory){
                        html += '<option value='+$value['id']+' selected>';
                        html += $value['name'];
                        html += '</option>';
                    } else {
                        html += '<option value='+$value['id']+'>';
                        html += $value['name'];
                        html += '</option>';
                    }

                });
                $('.idCategory').html(html);
                if ($result.producttype.status==1) {
                    $('.ht').attr('selected','selected');
                } else {
                    $('.kht').attr('selected','selected');
                }
            }
        });
        $('.updateProductType').click(function() {
            let ten = $('.name').val();
            let idCategory = $('.idCategory').val();
            let status = $('.status').val();

            $.ajax({
                url : 'admin/producttype/'+id,
                data : {
                    name : ten,
                    idCategory: idCategory,
                    status : status
                },
                dataType : 'json',
                type : 'put',
                success : function($data) {
                    if($data.error=='true'){
                        $('.error').show();
                        $('.error').html($data.message.name[0]);
                    } else {
                        toastr.success($data.result , 'Thông báo', {timeOut: 5000});
                        $('#edit').modal('hide');
                        location.reload();
                    }
                }
            });
        });
    });

    $('.deleteProducttype').click(function() {
        let id = $(this).data('id');
        $('.del').click(function() {
            $.ajax({
                url : 'admin/producttype/'+id,
                data : 'json',
                type: 'delete',
                success : function($data) {
                    toastr.success($data.result , 'Thông báo', {timeOut: 5000});
                    $('#delete').modal('hide');
                    location.reload();
                }
            });
        });
    });

    $('.cateProduct').change(function(){
        let idCate = $(this).val();
        $.ajax({
            url : 'getproducttype',
            data : {
                idCate : idCate
            },
            type : 'get',
            dataType : 'json',
            success : function($data) {
                let html = '';
                $.each($data, function($key, $value){
                    html += '<option value='+$value['idCategory']+'>';
                    html += $value['name'];
                    html += '</option>';
                });
                $('.proTypeProduct').html(html);
            }
        });
    });
    // Edit product
    $('.editProduct').click(function(){
        $('.errorName').hide();
        $('.errorQuantity').hide();
        $('.errorPrice').hide();
        $('.errorPromotional').hide();
        $('.errorImage').hide();
        $('.errorDescription').hide();
        let id = $(this).data('id');
        $.ajax({
            url : 'admin/product/'+id+'/edit',
            type : 'get',
            dataType : 'json',
            success : function(data) {
                $('.name').val(data.product.name);
                $('.quantity').val(data.product.quantity);
                $('.price').val(data.product.price);
                $('.promotional').val(data.product.promotional);
                $('.imageThum').attr('src', 'img/upload/product/'+data.product.image);
                if (data.product.status==1) {
                    $('.ht').attr('selected', 'selected');
                } else {
                    $('.kht').attr('selected', 'selected');
                }
                CKEDITOR.instances['demo'].setData(data.product.description);
                let html1 = '';
                $.each(data.category, function(key, value){
                    html1 += '<option value="'+value['id']+'"class="category"'+key+'>';
                        html1 += value['name'];
                    html1 +=  '</option>';
                    if (data.product.idCategory==value['id']) {
                        $('.category'+key).attr('selected', 'selected');
                    }
                });
                $('.cateProduct').html(html1);

                let html2 = '';
                $.each(data.producttype, function(key, value){
                    html2 += '<option value="'+value['id']+'"class="producttype"'+key+'>';
                        html2 += value['name'];
                    html2 +=  '</option>';
                    if (data.product.idCategory==value['id']) {
                        $('.producttype'+key).attr('selected', 'selected');
                    }
                });
                $('.proTypeProduct').html(html2);
            }
        });

        $('#updateProduct').on('submit', function(event){
            // Chặn form submit
            event.preventDefault();
            $.ajax({
                url : 'admin/updatePro/'+id,
                data : new FormData(this),
                contentType : false,
                processData : false,
                cache : false,
                type : 'post',
                success : function(data){
                    console.log(data);
                    if (data.error == 'true') {
                        if (data.massage.name) {
                            $('.errorName').show();
                            $('.errorName').text(data.massage.name[0]);
                            $('.name').val('');
                        }
                        if (data.massage.quantity) {
                            $('.errorQuantity').show();
                            $('.errorQuantity').text(data.massage.quantity[0]);
                            $('.quantity').val('');
                        }
                        if (data.massage.price) {
                            $('.errorPrice').show();
                            $('.errorPrice').text(data.massage.price[0]);
                            $('.price').val('');
                        }
                        if (data.massage.promotional) {
                            $('.errorPromotional').show();
                            $('.errorPromotional').text(data.massage.promotional[0]);
                            $('.promotional').val('');
                        }
                        if (data.massage.description) {
                            $('.errorDescription').show();
                            $('.errorDescription').text(data.massage.description[0]);
                            $('.description').val('');
                        }
                        if (data.massage.image) {
                            $('.errorImage').show();
                            $('.errorImage').text(data.massage.image[0]);
                            $('.image').val('');
                        }
                    } else {
                        toastr.success(data.result , 'Thông báo', {timeOut: 5000});
                        $('#delete').modal('hide');
                        location.reload();
                    }
                }
            });
        });
    });
    //  Delete product
    $('.deleteProduct').click(function() {
        let id = $(this).data('id');
        $('.delProduct').click(function() {
            $.ajax({
                url : 'admin/product/'+id,
                type : 'delete',
                dataType : 'json',
                success : function($data) {
                    toastr.success($data.result , 'Thông báo', {timeOut: 5000});
                    $('#delete').modal('hide');
                    location.reload();
                }
            });
        });
    });
});
