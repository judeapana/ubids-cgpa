export default {
    methods: {
        gradePoint({score}) {
            if (score < 30) {
                return 1.00;
            } else if (score <= 44) {
                return 1.50;
            } else if (score <= 49) {
                return 1.75;
            } else if (score <= 54) {
                return 2.00;
            } else if (score <= 59) {
                return 2.50;
            } else if (score <= 64) {
                return 3.00;
            } else if (score <= 69) {
                return 3.50;
            } else if (score <= 74) {
                return 3.75;
            } else if (score < 100) {
                return 4.00;
            }
            return 0;
        },
        finalClass(gpa) {
            if (gpa < 1.75) {
                return "Failed";
            } else if (gpa <= 1.99) {
                return "Passed";
            } else if (gpa <= 2.59) {
                return "Third Class";
            } else if (gpa <= 3.24) {
                return "Second Class Lower";
            } else if (gpa <= 3.64) {
                return "Second Class Upper";
            } else if (gpa >= 3.65) {
                return "First Class";
            } else {
                return "Not Found!!";
            }
        }
    }
}
