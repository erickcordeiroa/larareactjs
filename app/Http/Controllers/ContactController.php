<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse
     */
    public function index()
    {
        $query = Contact::query();

        if (request('search')) {
            $query->where('name', 'like', '%' . request('search') . '%');
            $query->orWhere('phone', 'like', '%' . request('search') . '%');
            $query->orWhere('email', 'like', '%' . request('search') . '%');
            $query->orWhere('age', 'like', '%' . request('search') . '%');
        }

        $contacts = $query->paginate(10)->onEachSide(1);

        return Inertia::render('Contact/Index', [
            'contacts' => $contacts,
            'queryParams' => request()->query() ?? null,
            'session' => session('success')
        ]);
    }

    public function create()
    {
        return Inertia::render('Contact/Create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     */
    public function store(Request $request)
    {
        $contact = Contact::create([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'age' => $request->input('age'),
        ]);

        return to_route('contact.index')->with('success', 'Contact created successfully');
    }

    /**
     * Display the specified resource.
     * @param string $id
     */
    public function edit(string $id)
    {
        $contact = Contact::find($id);
        return Inertia::render('Contact/Edit', ['contact' => $contact]);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $contact = Contact::find($id);
        $contact->update([
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
            'age' => $request->input('age')
        ]);

        return to_route('contact.index')->with('success', 'Contact updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     * @param string $id
     * @return void
     */
    public function destroy(string $id)
    {
        Contact::find($id)->delete();
    }
}
