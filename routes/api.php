<?php
use App\Http\Controllers\Api\CatalogController;
use Illuminate\Support\Facades\Route;
Route::get('/products',[CatalogController::class,'products']);
Route::get('/products/{product:slug}',[CatalogController::class,'product']);
Route::get('/brands',[CatalogController::class,'brands']);
Route::get('/industries',[CatalogController::class,'industries']);
Route::get('/resources',[CatalogController::class,'resources']);
Route::get('/search',[CatalogController::class,'search']);
