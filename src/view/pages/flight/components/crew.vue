<template>
    <a-row>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <label>First Name</label>
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <span>{{crewDetail.firstName}}</span>
        </a-col>
    </a-row>

    <a-row class="mt-5">
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <label>Last Name</label>
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <span>{{crewDetail.lastName}}</span>
        </a-col>
    </a-row>
    <a-row class="mt-5">
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <label>Position</label>
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <span>{{crewDetail.position}}</span>
        </a-col>
    </a-row>
    <a-row class="mt-5">
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <label>Employee ID</label>
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <span>{{crewDetail.employeeId}}</span>
        </a-col>
    </a-row>

    <a-row class="mt-5">
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <label>Licence Number</label>
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <span>{{crewDetail.licenceNumber}}</span>
        </a-col>
    </a-row>
    <a-row class="mt-5">
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <label>Nationality</label>
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
            <span>{{crewDetail.nationality && cuntryName(crewDetail.nationality)}}</span>
        </a-col>
    </a-row>
</template>
<script>
import { defineComponent, reactive, computed } from 'vue'
import counties from "../../../../helper/countryData.json";

export default defineComponent({
    props: {
        crew: {
            required: true
        }
    },
    setup(props) {
        const cuntryName = computed(() => country => counties[country].name)
        const crewDetail = reactive({
            firstName: props.crew && props.crew.get('firstName'),
            lastName: props.crew && props.crew.get('lastName'),
            position: props.crew && props.crew.get('Position'),
            employeeId: props.crew && props.crew.get('EmployeeId'),
            licenceNumber: props.crew && props.crew.get('LicenceNumber'),
            nationality: props.crew && props.crew.get('Nationality'),
        })


        return {
            crewDetail,
            cuntryName
        }
    },
})
</script>
