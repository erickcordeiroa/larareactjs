<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostsController extends Controller
{
    public function index()
    {
       
    }

    public function create() 
    {
        return Inertia::render('Posts/Create');
    }
}
