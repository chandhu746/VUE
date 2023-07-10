export function filterMarks(marks: number): string {
  if (marks >= 90) {
    return 'A+';
  } else if (marks >= 80) {
    return 'A';
  } else if (marks >= 70) {
    return 'B';
  } else if (marks >= 60) {
    return 'C';
  } else if (marks >= 50) {
    return 'D';
  } else {
    return 'F';
  }
}
