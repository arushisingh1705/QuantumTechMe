<?php

use App\Http\Controllers\{HomeController,ProductController,BrandController,IndustryController,SolutionController,ResourceController,BlogController,CaseStudyController,SearchController,InquiryController};
use App\Http\Controllers\Admin\{AuthController as AdminAuthController,DashboardController as AdminDashboardController,ProductController as AdminProductController,SimpleCatalogController,DocumentController as AdminDocumentController,InquiryController as AdminInquiryController,SettingController as AdminSettingController};
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class,'index'])->name('home');
Route::get('/products/{category?}', [ProductController::class,'index'])->name('products.index');
Route::get('/product/{product:slug}', [ProductController::class,'show'])->name('products.show');
Route::get('/compare', [ProductController::class,'compare'])->name('products.compare');
Route::get('/brands', [BrandController::class,'index'])->name('brands.index');
Route::get('/brands/{brand:slug}', [BrandController::class,'show'])->name('brands.show');
Route::get('/industries', [IndustryController::class,'index'])->name('industries.index');
Route::get('/industries/{industry:slug}', [IndustryController::class,'show'])->name('industries.show');
Route::get('/solutions', [SolutionController::class,'index'])->name('solutions.index');
Route::get('/solutions/{solution:slug}', [SolutionController::class,'show'])->name('solutions.show');
Route::get('/resources', [ResourceController::class,'index'])->name('resources.index');
Route::get('/resources/{document}/download', [ResourceController::class,'download'])->name('resources.download');
Route::get('/blog', [BlogController::class,'index'])->name('blog.index');
Route::get('/blog/{blog:slug}', [BlogController::class,'show'])->name('blog.show');
Route::get('/case-studies', [CaseStudyController::class,'index'])->name('case-studies.index');
Route::get('/case-studies/{caseStudy:slug}', [CaseStudyController::class,'show'])->name('case-studies.show');
Route::get('/search', [SearchController::class,'index'])->name('search');
Route::get('/request-quote', [InquiryController::class,'rfqForm'])->name('rfq.create');
Route::post('/request-quote', [InquiryController::class,'rfqStore'])->middleware('throttle:10,1')->name('rfq.store');
Route::view('/request-quote/thank-you','rfq.thankyou')->name('rfq.thankyou');
Route::get('/find-replacement', [InquiryController::class,'replacementForm'])->name('replacement.create');
Route::post('/find-replacement', [InquiryController::class,'replacementStore'])->middleware('throttle:10,1')->name('replacement.store');
Route::view('/find-replacement/thank-you','replacement.thankyou')->name('replacement.thankyou');
Route::get('/contact', [InquiryController::class,'contact'])->name('contact');
Route::post('/contact', [InquiryController::class,'contactStore'])->middleware('throttle:10,1')->name('contact.store');
Route::view('/about','home.about')->name('about');
Route::view('/privacy-policy','home.privacy')->name('privacy');
Route::view('/terms','home.terms')->name('terms');

Route::prefix('admin')->name('admin.')->group(function(){
 Route::get('/login',[AdminAuthController::class,'showLogin'])->name('login');
 Route::post('/login',[AdminAuthController::class,'login'])->name('login.submit');
 Route::middleware('admin')->group(function(){
  Route::get('/',AdminDashboardController::class)->name('dashboard');
  Route::post('/logout',[AdminAuthController::class,'logout'])->name('logout');
  Route::resource('products',AdminProductController::class)->except('show');
  Route::get('/catalog/{type}',[SimpleCatalogController::class,'index'])->name('catalog.index');
  Route::get('/catalog/{type}/create',[SimpleCatalogController::class,'create'])->name('catalog.create');
  Route::post('/catalog/{type}',[SimpleCatalogController::class,'store'])->name('catalog.store');
  Route::get('/catalog/{type}/{id}/edit',[SimpleCatalogController::class,'edit'])->name('catalog.edit');
  Route::put('/catalog/{type}/{id}',[SimpleCatalogController::class,'update'])->name('catalog.update');
  Route::delete('/catalog/{type}/{id}',[SimpleCatalogController::class,'destroy'])->name('catalog.destroy');
  Route::resource('documents',AdminDocumentController::class)->except('show');
  Route::get('/rfqs',[AdminInquiryController::class,'rfqs'])->name('rfqs.index');
  Route::get('/rfqs/{rfq}',[AdminInquiryController::class,'rfqShow'])->name('rfqs.show');
  Route::put('/rfqs/{rfq}',[AdminInquiryController::class,'rfqUpdate'])->name('rfqs.update');
  Route::get('/contacts',[AdminInquiryController::class,'contacts'])->name('contacts.index');
  Route::get('/replacements',[AdminInquiryController::class,'replacements'])->name('replacements.index');
  Route::put('/replacements/{replacement}',[AdminInquiryController::class,'replacementUpdate'])->name('replacements.update');
  Route::get('/settings',[AdminSettingController::class,'index'])->name('settings.index');
  Route::put('/settings',[AdminSettingController::class,'update'])->name('settings.update');
 });
});
