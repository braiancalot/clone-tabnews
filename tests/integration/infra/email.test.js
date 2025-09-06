import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

describe("infra/email.js", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "CloneTabNews <contato@clone-tabnews.teshi.com.br>",
      to: "contato@clone-tabnews.teshi.com.br",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "CloneTabNews <contato@clone-tabnews.teshi.com.br>",
      to: "contato@clone-tabnews.teshi.com.br",
      subject: "Último email enviado",
      text: "Corpo do último email.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contato@clone-tabnews.teshi.com.br>");
    expect(lastEmail.recipients[0]).toBe(
      "<contato@clone-tabnews.teshi.com.br>",
    );
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email.\r\n");
  });
});
