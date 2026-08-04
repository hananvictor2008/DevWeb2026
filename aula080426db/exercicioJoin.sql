USE basevendasv2;
 
-- QUESTÃO 1
SELECT c.nome AS cliente, v.nome AS vendedor
FROM cliente c JOIN vendedor v ON(c.vendedor_id=v.id);
 
-- QUESTÃO 2
SELECT p.descricao AS produto, tp.descricao AS tipo_produto
FROM produto p JOIN tipo_produto tp ON(p.tipo_produto_id=tp.id)
ORDER BY tipo_produto, produto;
 
-- QUESTÃO 3
SELECT c.nome, b.nome, ci.nome
FROM cliente c JOIN bairro b ON(c.bairro_id=b.id) JOIN cidade ci ON(b.cidade_id=ci.id)
WHERE ci.nome="Nova Friburgo" || ci.nome="Teresópolis";
 
-- QUESTÃO 4
SELECT f.nome, c.nome, uf.sigla
FROM fornecedor f JOIN cidade c ON(f.cidade_id=c.id) JOIN uf ON(c.uf_id=uf_id)
WHERE uf.sigla="RJ" AND f.nome NOT LIKE "% % % %";
 
-- QUESTÃO 5
SELECT p.descricao, f.nome
FROM produto p JOIN fornecedor f ON(p.fornecedor_id=f.id)
WHERE p.descricao LIKE "%SORO%";
 
-- QUESTÃO 6
SELECT c.nome, v.nome
FROM cliente c JOIN vendedor v ON(c.vendedor_id=v.id)
WHERE c.nome LIKE "A%";
 
-- QUESTÃO 7
SELECT p.descricao, tp.descricao, f.nome
FROM produto p JOIN tipo_produto tp ON(p.tipo_produto_id=tp.id) JOIN fornecedor f ON(p.fornecedor_id=f.id);
 
-- QUESTÃO 8
SELECT c.nome, uf.sigla
FROM cliente c JOIN bairro b ON(c.bairro_id=b.id) JOIN cidade ci ON(b.cidade_id=ci.id) JOIN uf ON(ci.uf_id=uf.id)
WHERE uf.sigla="MG" || uf.sigla="ES";
 
-- QUESTÃO 9
SELECT CONCAT(SUBSTRING(v.data_venda,9,2), "/", SUBSTRING(v.data_venda,6,2), "/", SUBSTRING(v.data_venda,1,4)) AS datav, c.nome, v.valor_total
FROM venda v JOIN cliente c ON(v.cliente_id=c.id)
WHERE c.bloqueado="N"
ORDER BY v.data_venda DESC;
 
-- QUESTÃO 10
SELECT CONCAT(SUBSTRING(v.data_venda,9,2), "/", SUBSTRING(v.data_venda,6,2), "/", SUBSTRING(v.data_venda,1,4)) AS datav, c.nome, ve.nome
FROM venda v JOIN cliente c ON(v.cliente_id=c.id) JOIN vendedor ve ON(c.vendedor_id=ve.id)
WHERE v.valor_total > 500;