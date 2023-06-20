import { validate } from "../src/domain/entity/validateCPF";

test.each([
	"407.302.170-27",
	"684.053.160-00",
	"746.971.314-01"
])("Should test valid cpf %s", function (cpf: string) {
	const isValid = validate(cpf);
	expect(isValid).toBeTruthy();
});

test.each([
	"406.302.170-27",
	"406.302.170",
	"406.302",
])("Should test invalid cpf %s", function (cpf: string) {
	const isValid = validate(cpf);
	expect(isValid).toBeFalsy();
});

test.each([
	"111.111.111-11",
	"222.222.222-22",
	"333.333.333-33"
])("Should test cpf with equal digits %s", function (cpf: string) {
	const isValid = validate(cpf);
	expect(isValid).toBeFalsy();
});