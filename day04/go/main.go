package main

import (
	"fmt"
	"io/ioutil"
	"regexp"
	"strings"
)

var requiredFields = [7]string{"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"}

func main() {
	input, err := ioutil.ReadFile("../input.txt")
	if err != nil {
		panic(err)
	}

	var passports []map[string]string
	dataset := strings.Split(string(input), "\n\n")

	for _, p := range dataset {
		passport := make(map[string]string)
		fields := regexp.MustCompile(`\s`).Split(p, -1)
		for _, f := range fields {
			fieldEntries := strings.Split(f, ":")
			passport[fieldEntries[0]] = fieldEntries[1]
		}
		passports = append(passports, passport)
	}

	fmt.Println(countValidPassports(passports))
}

func countValidPassports(ps []map[string]string) int {
	numValid := 0
	for _, p := range ps {
		isValid := true
		for _, f := range requiredFields {
			if _, ok := p[f]; !ok {
				isValid = false
				break
			}
		}
		if isValid {
			numValid++
		}
	}
	return numValid
}
