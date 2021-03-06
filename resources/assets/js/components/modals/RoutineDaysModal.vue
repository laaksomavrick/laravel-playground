<template>
    <modal
        :open="open"
        :headerText="headerText"
        :onClose="onClose"
        :onSubmit="onSubmit"
        :working="working"
        :disabled="disabled"
    >
        <div class="days">
            <div class="days__items">
                <div 
                    v-for="(day, index) in days"
                    class="days__item"
                    :key="index">
                    <h5 class="days__text">
                        {{ day.name }}
                    </h5>
                    <b-button variant="danger" class="days__del-btn" @click="handleDelete(day)">
                        <font-awesome-icon :icon="times" />
                    </b-button>
                </div>
            </div>
            <div class="days__input-container">
                <b-input class="days__input" @keyup="handleKeyup" v-model="text" />
                <b-button class="days__add-btn" variant="primary" @click="handleAdd"><font-awesome-icon :icon="plus" /></b-button>
            </div>
        </div>
    </modal>
</template>

<script>

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

import Modal from './Modal'
import ExerciseAutocomplete from '../ExerciseAutocomplete'
import { mapGetters, mapActions } from 'vuex'

export default {

    components: {
        Modal,
        FontAwesomeIcon
    },

    data: function() {
        return {
            working: false,
            text: null,
            days: []
        }
    },

    watch: {

        routine: function(val) {
            if (val && val.days) {
                this.days = val.days 
            }
        }

    },

    methods: {

        onClose: function() {
            return this.toggleRoutineDaysModal({open: false, props: {}})
        },

        onSubmit: async function() {
            const routine = {...this.routine, days: this.days}
            await this.getRoutineDaysModal.props.onSubmit(routine)
            this.onClose()
        },

        handleKeyup: function(e) {
            if (e.key === 'Enter') {
                this.handleAdd()
            }
        },

        handleDelete: function(day) {
            this.days = this.days.filter(d => d.name !== day.name)
        },

        handleAdd: function() {

            if (this.text.length <= 0) { return }

            const id = this.days.length === 0 ? 1 : this.days[this.days.length - 1].id + 1

            const day = {
                id,
                exercises: [],
                name: this.text,
                ordinal: this.days.length === 0 ? 0 : this.days.length + 1,
                routine_id: this.routine.id
            }

            this.days = [...this.days, day]
            this.text = null
        },

        ...mapActions([
            'toggleRoutineDaysModal',
        ])
    },

    computed: {

        open: function() {
            return this.getRoutineDaysModal.open
        },
        
        headerText: function() {
            return this.getRoutineDaysModal.props.headerText
        },

        routine: function() {
            return this.getRoutineDaysModal.props.routine
        },

        times: function() {
            return faTimes
        },

        plus: function() {
            return faPlus
        },

        disabled: function() {
            return this.days.length === 0
        },

        ...mapGetters([
            'getRoutineDaysModal',
        ])

    }



}

</script>

<style lang="scss" scoped>

.days {

    &__item {
        display: flex;
        align-items: center;
        margin-bottom: .5rem;
    }

    &__del-btn {
        margin-left: auto;
    }

    &__input-container {
        display: flex;
    }

    &__add-btn {
        margin-left: .5rem;
        width: 37px;
        display: flex;
        justify-content: center;
    }

}
</style>
