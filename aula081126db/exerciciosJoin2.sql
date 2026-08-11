USE basevendasv2;
-- 11)
-- SELECT DISTINCT ci.nome 
-- FROM cidade ci INNER JOIN fornecedor f ON (ci.id = f.cidade_id)
-- ORDER BY ci.nome;

-- 12)
-- SELECT p.descricao AS descricao, f.nome AS nome, tp.descricao AS tipo_produto
-- FROM produto p INNER JOIN fornecedor f ON (f.id = p.fornecedor_id)
-- INNER JOIN tipo_produto tp ON (tp.id = p.tipo_produto_id)
-- WHERE p.estoque > 100 AND p.preco_custo < 50;

-- 13)
-- SELECT f.nome 
-- FROM fornecedor f
-- WHERE f.nome LIKE "%FAR%" OR f.nome LIKE "%LAB%";

-- 14)
-- SELECT p.descricao AS produto, pv.quantidade AS quantidade, cl.nome AS comprador, CONCAT(SUBSTRING(v.data_venda, 9, 2), "/", SUBSTRING(v.data_venda, 6, 2), "/", SUBSTRING(v.data_venda, 1, 4)) AS DATA
-- FROM produto p INNER JOIN produto_vendido pv ON (p.id = pv.produto_id)
-- INNER JOIN venda v ON (v.id = pv.venda_id)
-- INNER JOIN cliente cl ON (cl.id = v.cliente_id);

-- 15)
-- SELECT p.descricao AS produto, p.preco_custo
-- FROM produto p
-- ORDER BY p.preco_custo DESC
-- LIMIT 5, 15;

-- 16)
-- SELECT cl.nome AS cliente, uf.sigla AS UF, ve.nome AS vendedor, cl.limite_credito AS credito
-- FROM cliente cl INNER JOIN bairro b ON (b.id = cl.bairro_id)
-- INNER JOIN cidade ci ON (ci.id = b.cidade_id)
-- INNER JOIN uf ON (uf.id = ci.uf_id)
-- INNER JOIN vendedor ve ON (ve.id = cl.vendedor_id)
-- WHERE cl.limite_credito > 5000;

-- 17)
-- SELECT p.descricao AS produto, uf.sigla AS estado
-- FROM produto p INNER JOIN fornecedor f ON (f.id = p.fornecedor_id)
-- INNER JOIN cidade ci ON (ci.id = f.cidade_id)
-- INNER JOIN uf ON (uf.id = ci.uf_id)
-- WHERE uf.sigla = "MG";

-- 18) 
-- SELECT cl.nome AS cliente, ci.nome AS cidade, ROUND(ve.comissao_percentual / 100 * v.valor_total, 2) AS comissao
-- FROM cliente cl INNER JOIN bairro b ON (b.id = cl.bairro_id)
-- INNER JOIN cidade ci ON (ci.id = b.cidade_id)
-- INNER JOIN venda v ON (cl.id = v.cliente_id)
-- INNER JOIN vendedor ve ON (ve.id = cl.vendedor_id)
-- WHERE SUBSTRING(v.data_venda, 1, 4) = "2006" AND ve.comissao_percentual / 100 * v.valor_total > 200;

-- 19)
-- SELECT p.descricao AS produto, cl.nome AS cliente, uf.sigla AS estado
-- FROM produto p INNER JOIN produto_vendido pv ON (p.id = pv.produto_id)
-- INNER JOIN venda v ON (v.id = pv.venda_id)
-- INNER JOIN cliente cl ON (cl.id = v.cliente_id)
-- INNER JOIN bairro b ON (b.id = cl.bairro_id)
-- INNER JOIN cidade ci ON (ci.id = b.cidade_id)
-- INNER JOIN uf ON (uf.id = ci.uf_id)
-- WHERE uf.sigla = "RJ";

-- 20)
-- SELECT l.numero_lote AS n_lote, l.quantidade AS QTD, p.descricao AS produto, f.nome AS fornecedor
-- FROM lote l INNER JOIN produto p ON (p.id = l.produto_id)
-- INNER JOIN fornecedor f ON (f.id = p.fornecedor_id)
-- WHERE l.quantidade > 50;

-- 21)
-- SELECT CONCAT(SUBSTRING(v.data_venda, 9, 2), "/", SUBSTRING(v.data_venda, 6, 2), "/", SUBSTRING(v.data_venda, 1, 4)) AS data, cl.nome AS cliente, ve.nome AS vendedor, uf.sigla
-- FROM venda v INNER JOIN cliente cl ON (cl.id = v.cliente_id)
-- INNER JOIN vendedor ve ON (ve.id = cl.vendedor_id)
-- INNER JOIN bairro b ON (b.id = cl.bairro_id)
-- INNER JOIN cidade ci ON (ci.id = b.cidade_id)
-- INNER JOIN uf ON (uf.id = ci.uf_id)
-- WHERE uf.sigla = "RJ" OR uf.sigla = "MG";

-- 22)
-- SELECT DISTINCT ve.nome AS vendedor
-- FROM vendedor ve INNER JOIN cliente cl ON (ve.id = cl.vendedor_id)
-- INNER JOIN venda v ON (cl.id = v.cliente_id)
-- INNER JOIN bairro b ON (b.id = cl.bairro_id)
-- INNER JOIN cidade ci ON (ci.id = b.cidade_id)
-- INNER JOIN uf ON (uf.id = ci.uf_id)
-- WHERE v.valor_total > (SELECT AVG(valor_total) FROM venda) AND (uf.sigla = "RJ" OR uf.sigla = "ES" OR uf.sigla = "SP");

-- 23)
-- SELECT f.nome As fornecedor, p.descricao AS produto
-- FROM fornecedor f LEFT JOIN produto p ON (f.id = p.fornecedor_id);

-- 24)
-- SELECT cl.nome AS cliente, b.nome AS bairro, ci.nome AS cidade, uf.sigla AS estado, v.valor_total AS valor, v.data_venda AS DATA
-- FROM cliente cl LEFT JOIN venda v ON (cl.id = v.cliente_id AND SUBSTRING(v.data_venda, 1, 4) = "2006")
-- INNER JOIN bairro b ON (b.id = cl.bairro_id)
-- INNER JOIN cidade ci ON (ci.id = b.cidade_id)
-- INNER JOIN uf ON (uf.id = ci.uf_id)
-- WHERE (uf.sigla = "RJ" OR uf.sigla = "MG" OR uf.sigla = "ES")
-- ORDER BY v.valor_total;

-- 25)
-- SELECT cl.nome AS cliente, b.nome AS bairro, ci.nome AS cidade, uf.sigla AS estado, v.valor_total AS valor, v.data_venda AS data
-- FROM cliente cl LEFT JOIN venda v ON (cl.id = v.cliente_id AND v.valor_total > 100 AND SUBSTRING(v.data_venda, 1, 4) = "2006")
-- INNER JOIN bairro b ON (b.id = cl.bairro_id)
-- INNER JOIN cidade ci ON (ci.id = b.cidade_id)
-- INNER JOIN uf ON (uf.id = ci.uf_id)
-- WHERE (uf.sigla = "RJ" OR uf.sigla = "MG" OR uf.sigla = "ES")
-- ORDER BY v.valor_total;