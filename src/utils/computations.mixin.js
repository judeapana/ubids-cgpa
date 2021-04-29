export default {
    methods: {
        gradePoint({score}) {
            if (score < 39) {
                return 0;
            } else if (score < 45) {
                return 1.5;
            } else if (score < 50) {
                return 2.0;
            } else if (score < 55) {
                return 2.5;
            } else if (score < 60) {
                return 3.0;
            } else if (score < 65) {
                return 3.5;
            } else if (score < 70) {
                return 4.0;
            } else if (score < 80) {
                return 4.5;
            } else if (score < 100) {
                return 5.0;
            }
            return 0;
        },
        finalClass(gpa) {
            if (gpa <= 1.49) {
                return "Failed";
            } else if (gpa <= 1.99) {
                return "Passed";
            } else if (gpa <= 2.49) {
                return "Third Class";
            } else if (gpa <= 3.49) {
                return "Second Class Lower";
            } else if (gpa <= 4.49) {
                return "Second Class Upper";
            } else if (gpa <= 5.0 && gpa >= 4.5) {
                return "First Class";
            } else {
                return "Not Found!!";
            }
        }
    }
}
