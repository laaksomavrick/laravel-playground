<template>
    <modal
        v-if="open"
        :headerText="headerText"
        :onClose="onClose"
        :onSubmit="onSubmit"
        :working="working"
        :disabled="disabled"
    >
        <div class="days">
            <div class="days__items">
                <div 
                    v-for="day in days"
                    class="days__item"
                 >
                    <div class="days__text">
                        {{ day.name }}
                    </div>
                    <button class="days__delete" @click="handleDelete(day)">
                        <font-awesome-icon :icon="times" />
                    </button>
                </div>
            </div>
            <div class="days__input-container">
                <input class="days__input" @keyup="handleKeyup" v-model="text"></input>
                <button class="days__add" @click="handleAdd"><font-awesome-icon :icon="plus" /></button>
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
                ordinal: this.days.length > 1 ? this.days.length - 1 : 0,
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

@import '../../../sass/bscore';
@import '~bootstrap/scss/buttons';
@import '~bootstrap/scss/forms';

.days {

    &__items {
        & > * {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        & > *:first-child {
            margin-top: 0px;
            margin-bottom: 10px;
        }
        & > *:last-child {
            margin-top: 10px;
            margin-bottom: 0px;
        }
    }

    &__item {
        display: flex;
        align-items: center;
    }

    &__text {
        flex: 1;
        font-size: 16px;
    }

    &__delete {
        @extend .btn;
        @extend .btn-danger;
        margin-left: auto;
        height: 25px;
        width: 25px;
        padding: 0;
        margin: 0;
    }

    &__input-container {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }

    &__input {
        @extend .form-control;
        flex: 1;
        margin-right: 10px;
    }

    &__add {
        width: 25px;
        height: 25px;
        @extend .btn;
        @extend .btn-primary;
        margin: 0;
        padding: 0;
    }

}

</style>