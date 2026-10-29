<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('qt:about', function () {
    $this->info('Quantum Tech Industrial Platform');
})->purpose('Display project information');
