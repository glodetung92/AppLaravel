@extends('admin.layouts.master')

@section('title')
    Thêm sản phẩm
@endsection

@section('content')
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Thêm sản phẩm</h6>
    </div>
    <div class="row" style="margin:5px">
        <div class="col-lg-12">
            <form action="{{ route('product.store') }}" method="POST" role="form" enctype="multipart/form-data">
                @csrf
                <fieldset class="form-group">
                    <label>Tên sản phẩm</label>
                    <input class="form-control" name="name" placeholder="Nhập tên sản phẩm">
                    @error('name')
                        <div class="alert alert-danger">{{ $message }}</div>
                    @enderror
                </fieldset>
                <div class="form-group">
                    <label for="quantity">Số lượng</label>
                    <input type="number" value="1" name="quantity" min="1" class="form-control">
                </div>
                <div class="form-group">
                    <label for="price">Đơn giá</label>
                    <input type="text" name="price" placeholder="Nhập đơn giá" class="form-control">
                </div>
                <div class="form-group">
                    <label for="promotional">Giá khuyến mãi</label>
                    <input type="text" name="promotional" placeholder="Nhập giá khuyến mãi nếu có" value="0" class="form-control">
                </div>
                <div class="form-group">
                    <label for="img">Ảnh minh họa</label>
                    <input type="file" name="image" class="form-control">
                </div>
                <div class="form-group">
                    <label>Mô tả sản phẩm</label>
                    <textarea name="description" id="demo" rows="5" cols="5" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label>Danh mục sản phẩm</label>
                    <select class="form-control" name="idCategory">
                        @foreach ($category as $cate)
                            <option value="{{ $cate->id }}">{{ $cate->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label>Loại sản phẩm</label>
                    <select class="form-control" name="idProductType">
                        @foreach ($producttype as $pro)
                            <option value="{{ $pro->id }}">{{ $pro->name }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="form-group">
                    <label>Status</label>
                    <select class="form-control" name="status">
                        <option value="1">Hiển thị</option>
                        <option value="0">Không hiển thị</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-success">Thêm</button>
                <button type="reset" class="btn btn-primary">Nhập lại</button>

            </form>

        </div>
    </div>
</div>
@endsection
