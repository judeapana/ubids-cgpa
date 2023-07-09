<template>
  <v-card color="red lighten-grey" flat tile :loading="false">
    <v-toolbar dense>
      <v-toolbar-title>UBIDS C/GPA</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="run_more_app" icon title="store">
        <v-icon color="green">mdi-android</v-icon>
      </v-btn>
      <v-btn @click="run" icon title="information">
        <v-icon color="pink">mdi-information</v-icon>
      </v-btn>
      <v-btn v-if="webShareApiSupported" @click="shareViaWebShare" icon title="Share">
        <v-icon color="green">mdi-share</v-icon>
      </v-btn>
      <v-btn v-if="$route.name!=='graph'" @click="add" class="ml-2" color="green darken-green" outlined fab small
             bottom>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-dialog v-model="info" width="500">
      <v-card>
        <v-card-title class="headline">
          Information
        </v-card-title>

        <v-card-text>
          <div>
            <p>This web application is built to assist students specific to UBIDS Grading Schema. </p>
            <p>We provide a variety of services, such as</p>
            <ul>
              <li>Company websites</li>
              <li>Custom website/Automated Systems</li>
              <li>Reseller systems for online sales of e-vouchers</li>
              <li>Management systems Pharmacy Management</li>
              <li>Donation Platforms via Short Code</li>
              <li>E-voting Systems</li>
              <li>Short code services</li>
            </ul>
            <p>If you have any issues or query kindly contact us on
              <a target="_blank" href="mailto:dev@yinsys.com">dev@yinsys.com</a> or on whatsApp
              <a target="_blank" href="https://chat.yinsys.com">https://chat.yinsys.com</a></p>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="info = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog fullscreen v-model="more_app" width="500">
      <v-toolbar
          dark
          color="primary">
        <v-btn
            icon
            dark
            @click="more_app = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <v-icon>mdi-android</v-icon>
          More Apps
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card>
        <v-card-title class="headline">
          More Apps
        </v-card-title>
        <v-card-text>
          <div>
            <p>We will be releasing more fun Apps/Toolkits very soon.</p>
            <p>You can send your wishlist to WhatsApp
              <v-btn small href="https://chat.yinsys.com">click Me
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
            </p>
          </div>
          <v-row class="mt-5">
            <v-col>
              <v-card >
                <v-img height="150"
                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9yKBo-nrhpIfdAGWOoy4XgMvwjftPI7yukMX7SICMXaYjbre_el8djj8bgS60Nlw6Bww&usqp=CAU"></v-img>
                <v-card-title>CGPA Calculator</v-card-title>
                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                    ></v-rating>
                    <div class="grey--text ms-2">
                      4.5 (413)
                    </div>
                  </v-row>
                  <div class="my-4 text-subtitle-1">
                    Free
                  </div>
                  <div>Effortlessly calculate your cumulative GPA and instantly determine your academic standing.</div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-btn href="https://cgpa.vasgh.com" target="_blank"
                         color="deep-purple lighten-2"
                         text>
                    Open App
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col>
              <v-card>
                <v-img height="150"
                       src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/768px-Adobe_Illustrator_CC_icon.svg.png?20220814183839"></v-img>
                <v-card-title>Student AI Assistant</v-card-title>
                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                    ></v-rating>
                    <div class="grey--text ms-2">
                      4.5 (413)
                    </div>
                  </v-row>
                  <div class="my-4 text-subtitle-1">
                    Coming Soon
                  </div>
                  <div>Expedite the completion of your assignments, homeworks, quizzes by entrusting them to an advanced
                    artificial intelligence.
                  </div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-btn disabled href="" target="_blank"
                         color="deep-purple lighten-2"
                         text>
                    Coming Soon
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  mixins: [],
  computed: {
    ...mapGetters('gpa', ['getForm', 'getInitialState']),
    webShareApiSupported() {
      return navigator.share
    },
  },
  name: "NavBar",
  methods: {
    run_more_app() {
      this.more_app = true;
    },
    run() {
      this.info = true;
    },
    shareViaWebShare() {
      navigator.share({
        title: 'Share UBIDS GPA Calculator with your friends and family.',
        text: 'Accumulative/ Grade point Calculator developed by Yin Systems Value Added Service. https://www.yinsys.com',
        url: this.$route.fullPath
      })
    },
    add() {
      let len = this.getForm.length;
      if (len === 0) {
        this.a_AddForm(this.getInitialState)
      } else {
        this.a_AddForm({
          ...this.getInitialState,
          index: this.getForm[len - 1].index + 1,
          courseName: `Course ${this.getForm[len - 1].index + 1}`
        },)
      }
    },
    ...mapActions('gpa', ["a_AddForm"]),
  },
  data: () => ({
    more_app: false,
    info: false,
    items: [
      {title: 'About Us'},
      {title: 'Share'},
    ],
  })
}
</script>
