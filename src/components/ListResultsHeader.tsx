import React, {FormEventHandler, useCallback} from 'react';
import styles from './ListResultsHeader.module.css';

const PRICE_ASC = 'PRICE_ASC';
const PRICE_DESC = 'PRICE_DESC';

type SortValues =
    | typeof PRICE_ASC
    | typeof PRICE_DESC;

type ListResultsHeaderProps = {
    resultsCount: number;
    resultsLocation: string;
    value: SortValues;
    onChange: (value: SortValues) => void;
}

export const ListResultsHeader = (props: ListResultsHeaderProps) => {

    const handleSubmit = useCallback<FormEventHandler>((evt) => {
        evt.preventDefault();
    }, []);

    const handleChange = useCallback<FormEventHandler<HTMLSelectElement>>((evt) => {
        props.onChange(evt.currentTarget.value as SortValues);
    }, [props.onChange]);

    return (
        <div className={styles.ListResultsHeader}>
            <div>{props.resultsCount} hotels in {props.resultsLocation}</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Sort by&nbsp;
                        <select onChange={handleChange}>
                            <option value={PRICE_DESC}>Price high-low</option>
                            <option value={PRICE_ASC}>Price low-high</option>
                        </select>
                    </label>
                </form>
            </div>
        </div>
    )
}
