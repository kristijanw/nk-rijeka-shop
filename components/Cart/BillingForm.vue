<script setup lang="ts">
import countriesJson from '@/assets/countries.json'

defineProps<{
    form: any
}>()

const countries = countriesJson.map((c) => ({
    label: c.name,
    value: c.value,
}))
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <!-- First Name -->
        <UFormGroup label="Ime" name="firstName" class="col-span-2 sm:col-span-1" required>
            <UInput v-model="form.firstName" placeholder="Ime" required />
        </UFormGroup>

        <!-- Last Name -->
        <UFormGroup label="Prezime" name="lastName" class="col-span-2 sm:col-span-1" required>
            <UInput v-model="form.lastName" placeholder="Prezime" />
        </UFormGroup>

        <!-- Company Name (optional) -->
        <UFormGroup label="Naziv firme (opcionalno)" name="company" class="col-span-2">
            <UInput v-model="form.company" placeholder="Naziv firme" />
        </UFormGroup>

        <!-- Country/Region -->
        <UFormGroup label="Država" name="country" class="col-span-2" required>
            <USelect v-model="form.country" :options="countries" placeholder="Odaberi državu" />
        </UFormGroup>

        <!-- City -->
        <UFormGroup label="Grad" name="city" class="col-span-2" required>
            <UInput v-model="form.city" placeholder="Grad" />
        </UFormGroup>

        <!-- ZIP/Postcode -->
        <UFormGroup label="Poštanski broj" name="zipCode" class="col-span-2" required>
            <UInput v-model="form.zipCode" placeholder="Poštanski broj" />
        </UFormGroup>

        <!-- Street Address -->
        <UFormGroup label="Adresa" name="address" class="col-span-2 space-y-2" required>
            <UInput v-model="form.address" placeholder="Ime ulice i broj" />
        </UFormGroup>

        <!-- Phone -->
        <UFormGroup label="Telefon" name="phone" class="col-span-2" required>
            <UInput v-model="form.phone" placeholder="Phone" />
        </UFormGroup>

        <!-- Email -->
        <UFormGroup label="Email" name="email" class="col-span-2" required>
            <UInput v-model="form.email" placeholder="Email" type="email" />
        </UFormGroup>

        <UFormGroup name="anotherAddress" class="col-span-2">
            <UCheckbox v-model="form.anotherAddress" label="Dostavi na drugu adresu" />
        </UFormGroup>

        <div v-if="form.anotherAddress" class="grid grid-cols-2 col-span-2 gap-4">
            <!-- Company Name (optional) -->
            <UFormGroup label="Naziv firme (opcionalno)" name="anotherCompany" class="col-span-2">
                <UInput v-model="form.anotherCompany" placeholder="Naziv firme" />
            </UFormGroup>

            <!-- Country/Region -->
            <!-- Required if anotherAddress is true -->
            <UFormGroup label="Država" name="anotherCountry" class="col-span-2" required>
                <USelect v-model="form.anotherCountry" :options="countries" placeholder="Odaberi državu" />
            </UFormGroup>

            <!-- City -->
            <UFormGroup label="Grad" name="anotherCity" class="col-span-2" required>
                <UInput v-model="form.anotherCity" placeholder="Grad" />
            </UFormGroup>

            <!-- ZIP/Postcode -->
            <UFormGroup label="Poštanski broj" name="anotherZipCode" class="col-span-2" required>
                <UInput v-model="form.anotherZipCode" placeholder="Poštanski broj" />
            </UFormGroup>

            <!-- Street Address -->
            <UFormGroup label="Adresa" name="anotherStreetAddress" class="col-span-2 space-y-2" required>
                <UInput v-model="form.anotherStreetAddress" placeholder="Ime ulice i broj" />
            </UFormGroup>
        </div>

        <!-- Order Notes -->
        <!-- <UFormGroup label="Napomena uz narudžbu (neobavezno)" name="orderNote" class="col-span-2">
            <UTextarea v-model="form.orderNote"
                placeholder="Napomene o vašoj narudžbi, npr. posebne upute za dostavu." />
        </UFormGroup> -->
    </div>
</template>

<style scoped>
:deep(.form-input:focus),
:deep(.form-input:focus-visible),
:deep(.form-select:focus),
:deep(.form-select:focus-visible),
:deep(textarea:focus),
:deep(textarea:focus-visible) {
    --tw-ring-color: #009ff5;
    --tw-border-color: #009ff5;
}

:deep(.form-input),
:deep(.form-select),
:deep(textarea) {
    padding-top: 10px;
    padding-bottom: 10px;
    height: 42px;
}
</style>
