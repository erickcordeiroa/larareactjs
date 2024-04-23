<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create('pt_BR');

        return [
            'name' => $faker->name,
            'phone' => $faker->phoneNumber,
            'email' => $faker->email,
            'age' => rand(18, 80),
        ];
    }
}
