<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_new_contact()
    {
        $user = User::factory()->create();

        $contact = [
            'name' => 'Evelin Tiemi Tanno',
            'phone' => '996060090',
            'email' => 'tiemitanno@gmail.com',
            'age' => 29,
        ];

        $response = $this
            ->actingAs($user)
            ->post(
                route('contact.store'),
                $contact
            );

        $response->assertStatus(200);
    }

    public function test_retrieve_single_contact()
    {
        $user = User::factory()->create();
        $contact = Contact::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(
                route('contact.show', ['id' => $contact->id]),
            );

        $response->assertStatus(200);
    }

    public function test_update_contact_exists()
    {
        $user = User::factory()->create();
        $contact = Contact::factory()->create();

        $newData = [
            'name' => 'Erick Cordeiro',
            'phone' => '996631713',
            'email' => 'erickcordeiroa@gmail.com',
            'age' => 31,
        ];

        $response = $this
            ->actingAs($user)
            ->put(
                route('contact.update', ['id' => $contact->id]),
                $newData
            );

        $response->assertStatus(200);
    }

    public function test_delete_contact_exists()
    {
        $contact = Contact::factory()->create();
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete(
                route('contact.destroy', ['id' => $contact->id]),
            );

        $response->assertStatus(200);
        $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
    }
}
