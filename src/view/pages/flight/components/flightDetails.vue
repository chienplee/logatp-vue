<template>
    <a-row :gutter="25">
        <a-col :lg="24" :md="24" :sm="24" :xs="24">
        <sdCards headless>
            <a-row>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>FlightDate</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{dateFormat(flight.get('flightDate'))}}</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Flight Number</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('flightNumber')}}</span>
            </a-col>
            </a-row>
        </sdCards>
        
        <a-divider orientation="left">AIRCRAFT</a-divider>
        
        <sdCards headless>
            <a-row >
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Manufacturer</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span></span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Type</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('aircraftType')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Registeration</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('aircraftRegistation')}}</span>
            </a-col>
            </a-row>

        </sdCards>

        <a-divider orientation="left">DEPARTURE AIRPORT</a-divider>

        <sdCards headless>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Airport Name </label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.departureAirportName}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>IATA</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.departureAirportIATAcode}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>ICAO</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.departureAirportICAOcode}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Country</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.departureAirportCountry}}</span>
            </a-col>
            </a-row>
        </sdCards>

        <a-divider orientation="left">DESTINATION AIRPORT</a-divider>

        <sdCards headless>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Airport Name </label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.destinationAirportName}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>IATA</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.destinationAirportIATAcode}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>ICAO</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.destinationAirportICAOcode}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Country</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{airport.destinationAirportCountry}}</span>
            </a-col>
            </a-row>
        </sdCards>

        <a-divider orientation="left">Time (UTC)</a-divider>
        <sdCards>
            <a-row>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Block Out</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{timeFormat(flight.get('outTime'))}}Z</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Block Off</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{timeFormat(flight.get('offTime'))}}Z</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Block On</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{timeFormat(flight.get('onTime'))}}Z</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Block In</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{timeFormat(flight.get('inTime'))}}Z</span>
            </a-col>
            </a-row>

        </sdCards>

        <a-divider orientation="left">CALCULATED</a-divider>
        <sdCards>
            <a-row>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Block Time</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('blockTime')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Flight Time</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('flightTime')}}</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Night Time</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('nghtTime')}}</span>
            </a-col>
            </a-row>

        </sdCards>

        <a-divider orientation="left">Settings</a-divider>
        <sdCards>
            <a-row>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>PIC Time</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('picTime')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>PF TakeOff</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('pfTakeoff')}}</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>PF Landing</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('pfLanding')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Autoland</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('autoland')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Go Around</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('goAround')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Diverted</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('diverted')}}</span>
            </a-col>
            </a-row>

        </sdCards>

        <a-divider orientation="left">EXTRAS</a-divider>
        <sdCards>
            <a-row>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Approach Type</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('approachType')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Total Passengers</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('totalPassengers')}}</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Total Payload</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('totalPayload')}}</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Flight Plan Distance</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('flightplanDistance')}}</span>
            </a-col>
            </a-row>

        </sdCards>

        <a-divider orientation="left">System Related</a-divider>
        <sdCards>
            <a-row>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Log Atp Id</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.get('realmID')}}</span>
            </a-col>
            </a-row>

            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Cloud Id</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{flight.id}}</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Flight Created At</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{dateFormat(flight.get('createdAt'))}}</span>
            </a-col>
            </a-row>
            <a-row class="mt-5">
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <label>Last Updated At</label>
            </a-col>
            <a-col :lg="4" :md="6" :sm="12" :xs="12">
                <span>{{dateFormat(flight.get('updatedAt'))}}</span>
            </a-col>
            </a-row>

        </sdCards>
        </a-col>
    </a-row>
</template>
<script>
import { defineComponent, reactive, inject } from 'vue';

export default defineComponent({
    props: {
        flight: {
            required: true
        },
        departureAirport: {
            required: true
        },
        destinationAirport: {
            required: true
        }
    },
    setup(props) {
        const dateFormat = inject('dateFormat');
        const timeFormat = inject('timeFormat');

        const airport = reactive({
            departureAirportName: props.departureAirport && props.departureAirport.get('airportName'),
            departureAirportICAOcode: props.departureAirport && props.departureAirport.get('ICAOcode'),
            departureAirportIATAcode: props.departureAirport && props.departureAirport.get('IATAcode'),
            departureAirportCountry: props.departureAirport && props.departureAirport.get('country'),

            destinationAirportName: props.destinationAirport && props.destinationAirport.get('airportName'),
            destinationAirportICAOcode: props.destinationAirport && props.destinationAirport.get('ICAOcode'),
            destinationAirportIATAcode: props.destinationAirport && props.destinationAirport.get('IATAcode'),
            destinationAirportCountry: props.destinationAirport && props.destinationAirport.get('country'),
        })


    return {
        dateFormat,
        timeFormat,
        airport
    };
    },
})
</script>

