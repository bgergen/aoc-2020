package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"
)

type Passport map[string]string
type Validator func(string) bool

var requiredFields = [7]string{"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"}
var validators = map[string]Validator{
	"byr": getRangeValidator(1920, 2002),
	"iyr": getRangeValidator(2010, 2020),
	"eyr": getRangeValidator(2020, 2030),
	"hgt": hgtValidator,
	"hcl": hclValidator,
	"ecl": eclValidator,
	"pid": pidValidator,
}

func main() {
	input, err := ioutil.ReadFile("../input.txt")
	if err != nil {
		panic(err)
	}

	var passports []Passport
	dataset := strings.Split(string(input), "\n\n")

	for _, p := range dataset {
		passport := make(Passport)
		fields := regexp.MustCompile(`\s`).Split(p, -1)
		for _, f := range fields {
			fieldEntries := strings.Split(f, ":")
			passport[fieldEntries[0]] = fieldEntries[1]
		}
		passports = append(passports, passport)
	}

	fmt.Println(countValidPassports(passports, hasRequiredFields))
	fmt.Println(countValidPassports(passports, hasValidFields))
}

func countValidPassports(ps []Passport, validator func(Passport) bool) int {
	numValid := 0
	for _, p := range ps {
		if validator(p) {
			numValid++
		}
	}
	return numValid
}

func hasRequiredFields(p Passport) bool {
	for _, f := range requiredFields {
		if _, ok := p[f]; !ok {
			return false
		}
	}
	return true
}

func hasValidFields(p Passport) bool {
	for _, f := range requiredFields {
		if v, ok := p[f]; !ok || !validators[f](v) {
			return false
		}
	}
	return true
}

func getRangeValidator(min, max int) func(string) bool {
	return func(n string) bool {
		if v, err := strconv.Atoi(n); err == nil {
			return v >= min && v <= max
		}
		return false
	}
}

func hgtValidator(h string) bool {
	u := h[len(h)-2:]
	if u != "cm" && u != "in" {
		return false
	}

	var rangeValidator func(string) bool
	if u == "cm" {
		rangeValidator = getRangeValidator(150, 193)
	} else {
		rangeValidator = getRangeValidator(59, 76)
	}

	return rangeValidator(h[:len(h)-2])
}

func hclValidator(h string) bool {
	return regexp.MustCompile("^#[0-9a-f]{6}$").MatchString(h)
}

func eclValidator(e string) bool {
	colors := [7]string{"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}
	for _, c := range colors {
		if e == c {
			return true
		}
	}
	return false
}

func pidValidator(p string) bool {
	return regexp.MustCompile(`^\d{9}$`).MatchString(p)
}
