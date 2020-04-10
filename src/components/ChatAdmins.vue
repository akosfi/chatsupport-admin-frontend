<template>
    <div class="admins">
        <div class="admins-input">
            <div 
                v-for="error in validationErrors"
                :key="error"
                class="alert alert-danger"
                role="alert">
                {{error}}
            </div>
            <div class="form-group">
                <label for="input">Add new admin</label>
                <input v-model="email" type="email" class="form-control" id="input" placeholder="Enter email">
            </div>
            <button v-on:click="addEmail" type="submit" class="btn btn-primary">Add</button>
        </div>
        <div class="admins-list list-group">
            <div 
                v-for="admin in getAdmins"
                :key="admin.id"
                class="admins-list-item list-group-item">
                <span>{{admin.email}}</span>
                <svg 
                    v-on:click="removeAdmin(admin.id)"
                    class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data: function() {
        return {
            email: '',
            validationErrors: [],
        };
    },
    computed: {
        ...mapGetters({
            getAdmins: 'admin/getAdmins',
            getClient: 'client/getClient'
        }),
    },
    components: {
    },
    mounted: function() {
        this.$store
                .dispatch('admin/getAdminsAction', this.getClient.id);
    },
    methods: {
        addEmail() {
            this.validationErrors = [];
            if(!this.email) return;
            this.$store
                .dispatch('admin/addAdminAction', {email: this.email, clientId: this.getClient.id})
                .then(() => {
                    this.email = '';
                })
                .catch((r) => {
                    this.validationErrors.push(r.message);
                });
        },
        removeAdmin(id) {
            this.$store
                    .dispatch('admin/removeAdminAction', {id, clientId: this.getClient.id});
        }
    }
}
</script>

<style lang="scss">
    .admins {
        width: 80%;
        margin: 0 auto;
        &-input {
            margin-top: 50px;
        }
        &-list {
            margin-top: 16px;

            &-item {
                display: flex;
                justify-content: space-between;
                
                &-delete {
                    cursor: pointer;
                }
            }
        }
    }
</style>